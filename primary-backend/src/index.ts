import express from "express";
import cors from "cors";
import { zapRouter } from "./route/zap.js";
import { userRouter } from "./route/user.js";


const app=express();
app.use(express.json());

app.use(cors());

app.use("/api/v1/user",userRouter);

app.use("/api/v1/zap",zapRouter);

app.listen(3001);