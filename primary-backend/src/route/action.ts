import {Router} from "express"
import axios from "axios";
import { authMiddleware } from "../middleware.js";
import prisma from "../db/index.js"
import { parse } from "../parser.js";
import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

const router=Router();

router.get("/available",async(req,res)=>{
    try{
        const availableActions=await prisma.availableAction.findMany({});
        res.json({
           availableActions
        })
    } catch(e){
        res.status(500).json({
            message: 'Error fetching action types'
        });
    }
})

router.post("/test-http", authMiddleware, async (req, res) => {
    try {
        const { method, url, auth, headers, body, testPayload } = req.body;
        const parseContext: Record<string, any> = { ...testPayload, body: testPayload };
        if (testPayload && typeof testPayload === "object" && "steps" in testPayload) {
            const stepsObj = testPayload.steps;
            if (stepsObj && typeof stepsObj === "object") {
                Object.entries(stepsObj).forEach(([stageNum, val]) => {
                    const stepIndex = parseInt(stageNum) + 1;
                    parseContext[`step${stepIndex}`] = val;
                });
            }
        }
        
        // 1. Resolve URL placeholders
        const resolvedUrl = parse(url, parseContext);
        
        // 2. Build headers
        const parsedHeaders: Record<string, string> = {};
        if (headers) {
            Object.entries(headers).forEach(([k, v]) => {
                parsedHeaders[k] = parse(String(v), parseContext);
            });
        }
        
        // 3. Inject auth headers
        if (auth) {
            if (auth.type === "Bearer" && auth.token) {
                parsedHeaders["Authorization"] = `Bearer ${parse(auth.token, parseContext)}`;
            } else if (auth.type === "Basic" && auth.username && auth.password) {
                const user = parse(auth.username, parseContext);
                const pass = parse(auth.password, parseContext);
                const encoded = Buffer.from(`${user}:${pass}`).toString("base64");
                parsedHeaders["Authorization"] = `Basic ${encoded}`;
            } else if (auth.type === "APIKey" && auth.key && auth.value) {
                parsedHeaders[parse(auth.key, parseContext)] = parse(auth.value, parseContext);
            }
        }
        
        // 4. Resolve Body
        let resolvedBody = body;
        if (typeof body === "string") {
            resolvedBody = parse(body, parseContext);
            try {
                // If it is JSON-like, try to parse it
                resolvedBody = JSON.parse(resolvedBody);
            } catch (e) {}
        } else if (body && typeof body === "object") {
            resolvedBody = JSON.parse(parse(JSON.stringify(body), parseContext));
        }
        
        // 5. Send HTTP request
        console.log(`Sending sandbox request: ${method || "GET"} to ${resolvedUrl}`);
        const response = await axios({
            method: method || "GET",
            url: resolvedUrl,
            headers: parsedHeaders,
            data: resolvedBody,
            timeout: 8000,
            validateStatus: () => true // Resolve promise on all status codes
        });
        
        return res.json({
            status: response.status,
            headers: response.headers,
            body: response.data
        });
    } catch (e: any) {
        return res.status(500).json({
            message: "HTTP Request sandbox error",
            error: e.message
        });
    }
});

router.post("/test-ai", authMiddleware, async (req, res) => {
    try {
        const { prompt: rawPrompt, schema, testPayload } = req.body;
        const parseContext: Record<string, any> = { ...testPayload, body: testPayload };
        if (testPayload && typeof testPayload === "object" && "steps" in testPayload) {
            const stepsObj = testPayload.steps;
            if (stepsObj && typeof stepsObj === "object") {
                Object.entries(stepsObj).forEach(([stageNum, val]) => {
                    const stepIndex = parseInt(stageNum) + 1;
                    parseContext[`step${stepIndex}`] = val;
                });
            }
        }
        const resolvedPrompt = parse(rawPrompt, parseContext);

        if (!process.env.GEMINI_API_KEY) {
            console.log("No GEMINI_API_KEY found, running mock AI structured parser.");
            const mockResult: Record<string, string> = {};
            if (schema && typeof schema === "object") {
                Object.keys(schema).forEach(key => {
                    mockResult[key] = `[Mock value for ${key} based on prompt: "${resolvedPrompt.substring(0, 30)}..."]`;
                });
            }
            return res.json({
                success: true,
                output: mockResult,
                isMock: true
            });
        }

        // Build dynamic Zod Schema
        const shape: Record<string, any> = {};
        if (schema && typeof schema === "object") {
            Object.entries(schema).forEach(([key, desc]) => {
                shape[key] = z.string().describe(parse(String(desc), parseContext));
            });
        }
        const zodSchema = z.object(shape);
        const parser = StructuredOutputParser.fromZodSchema(zodSchema);
        
        const formatInstructions = parser.getFormatInstructions();
        const finalPrompt = `${resolvedPrompt}\n\n${formatInstructions}`;
        
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GEMINI_API_KEY,
            temperature: 0.2,
            maxRetries: 1
        });
        
        const response = await model.invoke(finalPrompt);
        const structuredOutput = await parser.parse(response.content as string);
        
        return res.json({
            success: true,
            output: structuredOutput
        });
    } catch (e: any) {
        return res.status(500).json({
            message: "AI Request sandbox error",
            error: e.message
        });
    }
});

router.post("/test-discord", authMiddleware, async (req, res) => {
    try {
        const { webhookUrl, content, testPayload } = req.body;
        const parseContext: Record<string, any> = { ...testPayload, body: testPayload };
        if (testPayload && typeof testPayload === "object" && "steps" in testPayload) {
            const stepsObj = testPayload.steps;
            if (stepsObj && typeof stepsObj === "object") {
                Object.entries(stepsObj).forEach(([stageNum, val]) => {
                    const stepIndex = parseInt(stageNum) + 1;
                    parseContext[`step${stepIndex}`] = val;
                });
            }
        }
        
        const resolvedUrl = parse(webhookUrl, parseContext);
        const resolvedContent = parse(content, parseContext);
        
        await axios.post(resolvedUrl, { content: resolvedContent }, { timeout: 8000 });
        
        return res.json({
            success: true
        });
    } catch (e: any) {
        return res.status(500).json({
            message: "Discord Webhook sandbox error",
            error: e.response?.data?.message || e.message
        });
    }
});

export const actionRouter=router;

