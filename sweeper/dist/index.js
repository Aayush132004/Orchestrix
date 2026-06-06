import express from 'express';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { Kafka } from "kafkajs";
const TOPIC_NAME = "zap-events";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const client = new PrismaClient({ adapter });
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while (1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            take: 10
        });
        //pushing to kafka
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => ({
                value: r.zapRunId
            }))
        });
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(r => r.id)
                }
            }
        });
    }
}
//# sourceMappingURL=index.js.map