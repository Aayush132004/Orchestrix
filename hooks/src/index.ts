import express from 'express';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';


const app = express();
app.use(express.json());
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
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});