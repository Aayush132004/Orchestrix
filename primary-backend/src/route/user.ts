import {Router} from "express"
import bcrypt from "bcryptjs"
import { authMiddleware } from "../middleware.js";
import { SigninSchema, SignupSchema } from "../types/index.js";
import jwt from "jsonwebtoken"
import prisma from "../db/index.js"
import 'dotenv/config';

const router=Router();

router.post("/signup",async(req,res)=>{
    console.log("signup")
    const body=req.body
    console.log(body)
    const parsedData=SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }

    const userExists=await prisma.user.findFirst({
        where:{
            email:parsedData.data.username
        }
    });

    if(userExists){
       return res.status(403).json({
        message:"User already exists"
       }
       )
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    await prisma.user.create({
        data:{
            email:parsedData.data.username,
            password: hashedPassword,
            name:parsedData.data.name,
        }
    })

    //await sendEmail()
    //in user in db add a boolean verified
    return res.json({
        message:"Please verify your account by checking your email"
    })

})

router.post("/signin",async(req,res)=>{
    try{
    const body=req.body;
    const parsedData=SigninSchema.safeParse(body);
    // console.log("bp1")
    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    // console.log("body is ",body)
    //  console.log("bp2")
    //user not exists 
    const user=await prisma.user.findFirst({
      where:{
        email:parsedData.data.username,
      }
    })
    // console.log(user);
    //  console.log("bp3")

    if(!user)
    {
        return res.status(403).json({
            message:"Sorry credentials are incorrect"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(parsedData.data.password, user.password);
    if(!isPasswordCorrect){
        return res.status(403).json({
            message:"Sorry credentials are incorrect"
        })
    }

    //sign the jwt and return
    const token=jwt.sign({
        id:user.id,
    },process.env.JWT_SECRET as string);//as string to have no type error of undefined
    //  console.log("bp4")
    res.json({
        token:token,
    })
}
catch(e)
{
    res.json({
        message:"Error Signing you in"
    })
}
    
})

router.get("/user",authMiddleware,async(req,res)=>{
    //TODO:Fix type of id 

    //@ts-ignore
   const id=req.id;
   const user=await prisma.user.findFirst({
     where:{
        id
     },
     select:{
        name:true,
        email:true
     }
   });

   return res.json({
     user
   })
})

export const userRouter=router;