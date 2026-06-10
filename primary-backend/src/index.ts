import express from "express";
import cors from "cors";
import { zapRouter } from "./route/zap.js";
import { userRouter } from "./route/user.js";
import { triggerRouter } from "./route/trigger.js";
import { actionRouter } from "./route/action.js";


const app=express();
app.use(express.json());

app.use(cors());

app.use("/api/v1/user",userRouter);

app.use("/api/v1/zap",zapRouter);

//to choose diff type of trigger
app.use("/api/v1/trigger",triggerRouter);

//to choose diff type of action
app.use("/api/v1/action",actionRouter);

app.listen(3002,()=>{
    console.log("Primary-backend listening to port 3002")
});