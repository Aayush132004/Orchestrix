
import {Kafka} from "kafkajs"
import prisma from "../db/index.js"
import type { JsonObject } from "@prisma/client/runtime/client";
import { parse } from "./parser.js";
import { sendEmail } from "./email.js";



const TOPIC_NAME="zap-events"

const kafka=new Kafka({
    clientId:'outbox-processor',
    brokers:['localhost:9092']
})

async function main() {
  // console.log("Test0")
  const producer=kafka.producer();
  await producer.connect();

  const consumer=kafka.consumer({groupId:"main-worker"})
  await consumer.connect();

  await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true})

  await consumer.run({
    autoCommit:false,//not move to next offset until and unless will tell kafka done 
    eachMessage:async({topic,partition,message})=>{
        console.log({
            partition,
            offset:message.offset,
            value:message.value?.toString(),
        })

        if(!message.value?.toString()){
          // console.log("hi");
          return;
        }
          // console.log("Test3")
        const parsedValue=JSON.parse(message.value?.toString());
        const zapRunId=parsedValue.zapRunId;
        const stage=parsedValue.stage;
        //getting associated zap with this zapRun
        // console.log("test1");
        const zapRunDetails=await prisma.zapRuns.findFirst({
          where:{
            id:zapRunId
          },
          include:{
            zap:{
              include:{
                actions:{
                  include:{
                    type:true,
                  }
                },
              }
            }
          }
          });
          // console.log("Test2")
          //instead of recursive can even do sequentially
          //send a query to get back the zapId
          //send a query to get back the associated actions to this zapid
          //find the available action ie id and name of current action

          //execute the stage 
          const currentAction=zapRunDetails?.zap.actions.find(x=>x.sortingOrder===stage);
          
          console.log("Current Actions Are",currentAction)
          if(!currentAction){
            console.log("Current action not found");
            return;
          }
               const zapRunMetadata=zapRunDetails?.metadata;
          if(currentAction.type.id==="send-email"){
           console.log("Sending out email")
       
          const body=parse((currentAction.metadata as JsonObject)?.body as string,zapRunMetadata);//this value be somthing like ==> you just receives {comment.amount}
          const to=parse((currentAction.metadata as JsonObject)?.email as string,zapRunMetadata);//{comment.email}
          //require to parse these(string manipulation) ( fill template with extracted info) to send mail to person 
          // console.log(`Sending out email to ${to} & body is ${body}`)
          await sendEmail(to,body);
          }
          if(currentAction.type.id==="send-sol"){
            console.log("Sending out solana")
            const amount=parse((currentAction.metadata as JsonObject)?.amount as string,zapRunMetadata);
            const address=parse((currentAction.metadata as JsonObject)?.address as string,zapRunMetadata);
            console.log(`Sending out SOL amount :${amount} to address ${address}`)
          }
      

          //wait for 5ms
          await new Promise(r=>setTimeout(r,500));
         
          //repush to queue to execute next stage further if stage isn't last stage
          const lastStage=(zapRunDetails?.zap.actions?.length||1)-1;

          if(lastStage!=stage){
           await producer.send({
            topic:TOPIC_NAME,
            messages:[{
              value:JSON.stringify({
                stage:stage+1,
                zapRunId
              })

            }]

           })
          }

          // const zapId=message.value?.toString();
        //thus moving further may happen server crash-> will cause event pop from queue but not processed hence we use some acknowledgement 
        //mechanism
       //sending email etc tasks
       await consumer.commitOffsets([{
        topic:TOPIC_NAME,
        partition:partition,
        offset:(parseInt(message.offset)+1).toString() 
    }])

    }
  })

}
main();