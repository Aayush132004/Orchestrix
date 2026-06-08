import {Router} from "express"

import { authMiddleware } from "../middleware.js";
import { SigninSchema, SignupSchema } from "../types/index.js";
import jwt from "jsonwebtoken"
import prisma from "../db/index.js"
import 'dotenv/config';

const router=Router();

router.get("/available",async(req,res)=>{
    try{
    const availableActions=await prisma.availableAction.findMany({});
    res.json({
       availableActions
    })
}
catch(e){
    message:'Error fetching action types'
}
})

export const actionRouter=router;
