import express from 'express';
import cors from 'cors';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';


const app = express();
app.use(express.json());
app.use(cors());
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter,
    transactionOptions: {
    maxWait: 10000, // Gives Prisma up to 10 seconds to secure/hold the transaction slot
    timeout: 15000  // Gives the overall transaction up to 15 seconds to fully complete
  }
 });
//https://hooks.orchestrix.dev/hooks/catch/3131313/11d13/
//password logic


app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const { userId, zapId } = req.params;
    // const { password } = req.body;

    //match this password wih users password in db to ensure endpoint is not being hit by bots or hackers

    //storing in DB a new trigger 
    await prisma.$transaction(async(txn:any)=>{
        const run=await txn.zapRuns.create({
            data:{
                zapId:zapId,
                metadata:req.body
            }
        })
        await txn.zapRunOutbox.create({
            data:{
                zapRunId:run.id
            }
        })
    })
    
    res.json({
      message:`zaprun and zaprunoutdoor created`
    })
    //store in db a new trigger

    //push it on to a queue(kafka,redis)
})

app.post("/hooks/catch/:userId/:zapId/test", async (req, res) => {
    const { userId, zapId } = req.params;
    
    try {
        await prisma.$transaction(async (txn) => {
            await txn.zap.upsert({
                where: { id: zapId },
                update: {},
                create: {
                    id: zapId,
                    userId: parseInt(userId)
                }
            });

            const existingTrigger = await txn.trigger.findUnique({
                where: { zapId }
            });
            const existingMetadata = existingTrigger?.metadata as Record<string, any> || {};
            const updatedMetadata = {
                ...existingMetadata,
                testPayload: req.body
            };

            await txn.trigger.upsert({
                where: { zapId },
                update: {
                    metadata: updatedMetadata
                },
                create: {
                    zapId,
                    triggerId: "webhook",
                    metadata: updatedMetadata
                }
            });
        });

        res.json({
            message: "Test payload saved successfully"
        });
    } catch (e: any) {
        res.status(500).json({
            message: "Error saving test payload",
            error: e.message
        });
    }
})
app.listen(3004, async() => {
    console.log('Hook Server is running on port 3004');
    
});