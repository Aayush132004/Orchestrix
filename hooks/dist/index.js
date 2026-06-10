"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter,
    transactionOptions: {
        maxWait: 10000, // Gives Prisma up to 10 seconds to secure/hold the transaction slot
        timeout: 15000 // Gives the overall transaction up to 15 seconds to fully complete
    }
});
//https://hooks.orchestrix.dev/hooks/catch/3131313/11d13/
//password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const { userId, zapId } = req.params;
    // const { password } = req.body;
    //match this password wih users password in db to ensure endpoint is not being hit by bots or hackers
    //storing in DB a new trigger 
    await prisma.$transaction(async (txn) => {
        const run = await txn.zapRuns.create({
            data: {
                zapId: zapId,
                metadata: req.body
            }
        });
        await txn.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
    });
    res.json({
        message: `zaprun and zaprunoutdoor created`
    });
    //store in db a new trigger
    //push it on to a queue(kafka,redis)
});
app.listen(3004, async () => {
    console.log('Hook Server is running on port 3004');
});
