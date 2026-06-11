import { Kafka } from "kafkajs";
import 'dotenv/config';
import prisma from "../db/index.js";
import { parse } from "./parser.js";
import { sendEmail } from "./email.js";
import axios from "axios";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
const TOPIC_NAME = "zap-events";
const kafkaConfig = {
    clientId: 'outbox-processor',
    brokers: (process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092').split(','),
};
if (process.env.KAFKA_USERNAME) {
    const sslOptions = {
        rejectUnauthorized: process.env.KAFKA_REJECT_UNAUTHORIZED === 'true' ? true : false
    };
    if (process.env.KAFKA_CA_CERT) {
        sslOptions.ca = [process.env.KAFKA_CA_CERT];
    }
    kafkaConfig.ssl = sslOptions;
    if (process.env.KAFKA_PASSWORD) {
        kafkaConfig.sasl = {
            mechanism: 'scram-sha-256',
            username: process.env.KAFKA_USERNAME,
            password: process.env.KAFKA_PASSWORD
        };
    }
}
console.log("Constructed Kafka Config:", JSON.stringify(kafkaConfig, null, 2));
const kafka = new Kafka(kafkaConfig);
async function main() {
    // Ensure topic exists before subscribing
    try {
        const admin = kafka.admin();
        console.log("Connecting admin to check/create topic...");
        await admin.connect();
        const topics = await admin.listTopics();
        if (!topics.includes(TOPIC_NAME)) {
            console.log(`Topic '${TOPIC_NAME}' does not exist. Creating it...`);
            await admin.createTopics({
                topics: [{
                        topic: TOPIC_NAME,
                        numPartitions: 1,
                        replicationFactor: 1
                    }]
            });
            console.log(`Topic '${TOPIC_NAME}' created successfully.`);
        }
        else {
            console.log(`Topic '${TOPIC_NAME}' already exists.`);
        }
        await admin.disconnect();
    }
    catch (adminErr) {
        console.warn("Failed to check/create topic via Admin client (it might already exist or auto-creation is handled):", adminErr.message);
    }
    const producer = kafka.producer();
    await producer.connect();
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
            if (!message.value?.toString()) {
                await consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
                return;
            }
            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;
            const zapRunDetails = await prisma.zapRuns.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true,
                                }
                            },
                        }
                    }
                }
            });
            const zapRunMetadata = zapRunDetails?.metadata;
            if (zapRunMetadata && typeof zapRunMetadata === "object" && zapRunMetadata.steps && zapRunMetadata.steps[stage] !== undefined) {
                console.log(`Stage ${stage} for ZapRun ${zapRunId} already executed. Skipping execution to prevent duplicate actions.`);
                await consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
                return;
            }
            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);
            console.log("Current Action is", currentAction);
            if (!currentAction) {
                console.log("Current action not found");
                await consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
                return;
            }
            // Reuse the already declared and typed zapRunMetadata
            const metadata = currentAction.metadata;
            let stepOutput = {};
            let hasError = false;
            try {
                const parseContext = { ...zapRunMetadata, body: zapRunMetadata };
                if (zapRunMetadata && typeof zapRunMetadata === "object" && "steps" in zapRunMetadata) {
                    const stepsObj = zapRunMetadata.steps;
                    if (stepsObj && typeof stepsObj === "object") {
                        Object.entries(stepsObj).forEach(([stageNum, val]) => {
                            const stepIndex = parseInt(stageNum) + 1;
                            parseContext[`step${stepIndex}`] = val;
                        });
                    }
                }
                if (currentAction.type.id === "send-email") {
                    console.log("Executing Email Send action...");
                    const body = parse((metadata)?.body, parseContext);
                    const to = parse((metadata)?.email, parseContext);
                    await sendEmail(to, body);
                    stepOutput = { success: true };
                }
                else if (currentAction.type.id === "http-request") {
                    console.log("Executing HTTP request action...");
                    const method = (metadata)?.method || "GET";
                    const url = parse((metadata)?.url, parseContext);
                    const headers = {};
                    const rawHeaders = (metadata)?.headers;
                    if (rawHeaders) {
                        Object.entries(rawHeaders).forEach(([k, v]) => {
                            headers[k] = parse(String(v), parseContext);
                        });
                    }
                    const auth = (metadata)?.auth;
                    if (auth) {
                        if (auth.type === "Bearer" && auth.token) {
                            headers["Authorization"] = `Bearer ${parse(auth.token, parseContext)}`;
                        }
                        else if (auth.type === "Basic" && auth.username && auth.password) {
                            const user = parse(auth.username, parseContext);
                            const pass = parse(auth.password, parseContext);
                            const encoded = Buffer.from(`${user}:${pass}`).toString("base64");
                            headers["Authorization"] = `Basic ${encoded}`;
                        }
                        else if (auth.type === "APIKey" && auth.key && auth.value) {
                            headers[parse(auth.key, parseContext)] = parse(auth.value, parseContext);
                        }
                    }
                    let requestBody = (metadata)?.body;
                    if (typeof requestBody === "string") {
                        requestBody = parse(requestBody, parseContext);
                        try {
                            requestBody = JSON.parse(requestBody);
                        }
                        catch (e) { }
                    }
                    else if (requestBody && typeof requestBody === "object") {
                        requestBody = JSON.parse(parse(JSON.stringify(requestBody), parseContext));
                    }
                    const response = await axios({
                        method,
                        url,
                        headers,
                        data: requestBody ?? null,
                        timeout: 8000,
                        validateStatus: () => true
                    });
                    stepOutput = { status: response.status, body: response.data };
                }
                else if (currentAction.type.id === "ai-action") {
                    console.log("Executing AI Prompt action...");
                    const rawPrompt = (metadata)?.prompt;
                    const schema = (metadata)?.schema;
                    const resolvedPrompt = parse(rawPrompt, parseContext);
                    if (!process.env.GEMINI_API_KEY) {
                        console.log("No GEMINI_API_KEY found, running mock AI structured parser.");
                        const mockResult = {};
                        if (schema && typeof schema === "object") {
                            Object.keys(schema).forEach(key => {
                                mockResult[key] = `[Mock value for ${key} based on prompt: "${resolvedPrompt.substring(0, 30)}..."]`;
                            });
                        }
                        stepOutput = { output: mockResult, isMock: true };
                    }
                    else {
                        const shape = {};
                        if (schema && typeof schema === "object") {
                            Object.entries(schema).forEach(([key, desc]) => {
                                shape[key] = z.string().describe(parse(String(desc), parseContext));
                            });
                        }
                        const zodSchema = z.object(shape);
                        const parser = StructuredOutputParser.fromZodSchema(zodSchema);
                        const formatInstructions = parser.getFormatInstructions();
                        const finalPrompt = `${resolvedPrompt}\n\n${formatInstructions}`;
                        console.log("Initializing Gemini model...");
                        console.log("API Key exists in worker env:", !!process.env.GEMINI_API_KEY);
                        const model = new ChatGoogleGenerativeAI({
                            model: "gemini-2.5-flash",
                            apiKey: process.env.GEMINI_API_KEY,
                            temperature: 0.2,
                            maxRetries: 1
                        });
                        console.log("Invoking Gemini model. Prompt length:", finalPrompt.length);
                        const response = await model.invoke(finalPrompt);
                        console.log("Gemini response received successfully!");
                        const structuredOutput = await parser.parse(response.content);
                        stepOutput = { output: structuredOutput };
                    }
                }
                else if (currentAction.type.id === "discord-webhook") {
                    console.log("Executing Discord webhook action...");
                    const rawUrl = (metadata)?.webhookUrl;
                    const rawContent = (metadata)?.content;
                    const url = parse(rawUrl, parseContext);
                    const content = parse(rawContent, parseContext);
                    await axios.post(url, { content }, { timeout: 8000 });
                    stepOutput = { success: true };
                }
                const currentRunDetails = await prisma.zapRuns.findFirst({
                    where: { id: zapRunId }
                });
                const currentMetadata = currentRunDetails?.metadata || {};
                const updatedMetadata = {
                    ...currentMetadata,
                    steps: {
                        ...(currentMetadata.steps || {}),
                        [stage]: stepOutput
                    }
                };
                await prisma.zapRuns.update({
                    where: { id: zapRunId },
                    data: { metadata: updatedMetadata }
                });
            }
            catch (actionErr) {
                hasError = true;
                console.error("Error executing action stage:", actionErr.message);
                try {
                    const currentRunDetails = await prisma.zapRuns.findFirst({
                        where: { id: zapRunId }
                    });
                    const currentMetadata = currentRunDetails?.metadata || {};
                    const updatedMetadata = {
                        ...currentMetadata,
                        steps: {
                            ...(currentMetadata.steps || {}),
                            [stage]: { error: actionErr.message }
                        }
                    };
                    await prisma.zapRuns.update({
                        where: { id: zapRunId },
                        data: { metadata: updatedMetadata }
                    });
                }
                catch (saveErr) { }
            }
            await new Promise(r => setTimeout(r, 500));
            const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;
            if (!hasError && lastStage != stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                            value: JSON.stringify({
                                stage: stage + 1,
                                zapRunId
                            })
                        }]
                });
            }
            await consumer.commitOffsets([{
                    topic: TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset) + 1).toString()
                }]);
        }
    });
}
import http from 'http';
// Simple HTTP health check server for Render free-tier hosting
const PORT = process.env.PORT || 3006;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Worker Active\n');
}).listen(PORT, () => {
    console.log(`Health check server listening on port ${PORT}`);
});
main();
//# sourceMappingURL=index.js.map