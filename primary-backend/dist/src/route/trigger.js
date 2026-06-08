import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { SigninSchema, SignupSchema } from "../types/index.js";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import 'dotenv/config';
const router = Router();
router.get("/available", async (req, res) => {
    try {
        const availableTriggers = await prisma.availableTriggers.findMany({});
        res.json({
            availableTriggers
        });
    }
    catch (e) {
        message: 'Error fetching trigger types';
    }
});
export const triggerRouter = router;
//# sourceMappingURL=trigger.js.map