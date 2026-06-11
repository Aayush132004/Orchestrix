import {Router} from "express"
import { authMiddleware } from "../middleware.js";
import { ZapCreateSchema } from "../types/index.js";
const router=Router();
import prisma from "../db/index.js";

//create a zap
router.post("/",authMiddleware,async(req,res)=>{
    const body=req.body;
    //@ts-ignore
    const id=req.id;
    const parsedData=ZapCreateSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        });
    }
   try{
    const zapId = parsedData.data.zapId;
    if (zapId) {
        // Clear draft data to avoid conflict
        await prisma.action.deleteMany({ where: { zapId } });
        await prisma.trigger.deleteMany({ where: { zapId } });
        await prisma.zap.deleteMany({ where: { id: zapId } });
    }

    const createData: any = {
        userId: parseInt(id),
        trigger: {
            create: {
                triggerId: parsedData.data.availableTriggerId
            }
        },
        actions: {
            create: parsedData.data.actions
                .filter(x => x.availableActionId && x.availableActionId.trim() !== "")
                .map((x, index) => ({
                    actionId: x.availableActionId,
                    sortingOrder: index,
                    metadata: x.actionMetadata || {}
                }))
        }
    };
    if (zapId) {
        createData.id = zapId;
    }

    const zap = await prisma.zap.create({
        data: createData
    });

    res.status(201).json({
        message:"Zap created successfully",
        zapId:zap.id
    })
}
catch(e:any)
{
    res.status(500).json(
        {
            message:e.message
        }
    )
}
})


//get all zaps of a person
router.get("/",authMiddleware,async(req,res)=>{
   //@ts-ignore
   try{
    //@ts-ignore
   const id=req.id;
   const zaps=await prisma.zap.findMany({
     where:{
        userId:id
     },
     include:{
        actions:{
            include:{
                type:true
            }
        },
        trigger:{
            include:{
                type:true
            }
        }
     }
   });
   console.log("zaps handler");
   return res.json({
    zaps
   })
}
catch(e:any)
{
    res.status(500).json({
       message:"issue in getting zaps of the user"
    })
}
})

router.get("/:zapId",authMiddleware,async(req,res)=>{
    try{
     //@ts-ignore
   const id=req.id;
   const zapId=req.params.zapId as string;
   const zap=await prisma.zap.findFirst({
     where:{
        id:zapId,
        userId:id
     },
     include:{
        actions:{
            include:{
                type:true
            }
        },
        trigger:{
            include:{
                type:true
            }
        },
        zapRuns: {
            orderBy: {
                createdAt: "desc"
            }
        }
     }
   });
   console.log("zap handler by id");
   return res.json({
    zap
   })
}
catch(e:any){
    res.status(500).json({
        message:"error in getting this zap for the user"
    })
}
})

router.get("/:zapId/test-payload", authMiddleware, async (req, res) => {
    try {
        const zapId = req.params.zapId as string;
        const trigger = await prisma.trigger.findUnique({
            where: { zapId }
        });
        
        return res.json({
            testPayload: (trigger?.metadata as any)?.testPayload || null
        });
    } catch (e: any) {
        res.status(500).json({
            message: "Error fetching test payload",
            error: e.message
        });
    }
})

export const zapRouter=router;