import express from 'express';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { Kafka } from "kafkajs"
import 'dotenv/config';

const TOPIC_NAME = "zap-events"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const client = new PrismaClient({ adapter });

const kafkaConfig: any = {
    clientId: 'outbox-processor',
    brokers: (process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092').split(','),
};

if (process.env.KAFKA_USERNAME) {
    const sslOptions: any = {
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
    // Ensure topic exists before producing messages
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
        } else {
            console.log(`Topic '${TOPIC_NAME}' already exists.`);
        }
        await admin.disconnect();
    } catch (adminErr: any) {
        console.warn("Failed to check/create topic via Admin client (it might already exist or auto-creation is handled):", adminErr.message);
    }

    const producer = kafka.producer();
    await producer.connect();

    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            take: 10
        });

        if (pendingRows.length > 0) {
            console.log(`Processing ${pendingRows.length} pending outbox rows...`);

            // Await the Kafka producer send to ensure messages are pushed before deletion
            await producer.send({
                topic: TOPIC_NAME,
                messages: pendingRows.map(r => ({
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }))
            });

            await client.zapRunOutbox.deleteMany({
                where: {
                    id: {
                        in: pendingRows.map(r => r.id)
                    }
                }
            });
        } else {
            // Sleep for 1 second if there are no pending rows to avoid pegging CPU/DB
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

import http from 'http';

// Simple HTTP health check server for Render free-tier hosting
const PORT = process.env.PORT || 3005;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Sweeper Active\n');
}).listen(PORT, () => {
    console.log(`Health check server listening on port ${PORT}`);
});

main();