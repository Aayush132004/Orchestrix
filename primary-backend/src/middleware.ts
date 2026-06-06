import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization as string; //converting forcefully to string to prevent type error further
    
    try{
    const payload=jwt.verify(token,process.env.JWT_SECRET as string)
    //@ts-ignore
    req.id=payload.id
    next()

    }catch(e){
        return res.status(403).json({
            message:"You are not logged in"
        })
    }
    
}