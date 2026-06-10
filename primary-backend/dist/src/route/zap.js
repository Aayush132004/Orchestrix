import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { ZapCreateSchema } from "../types/index.js";
const router = Router();
import prisma from "../db/index.js";
//create a zap
router.post("/", authMiddleware, async (req, res) => {
    const body = req.body;
    //@ts-ignore
    const id = req.id;
    const parsedData = ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    // console.log("create a zap");
    try {
        const zap = await prisma.zap.create({
            data: {
                userId: parseInt(id),
                trigger: {
                    create: {
                        triggerId: parsedData.data.availableTriggerId
                    }
                },
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
                    }))
                }
            }
        });
        res.status(201).json({
            message: "Zap created successfully",
            zapId: zap.id
        });
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});
//get all zaps of a person
router.get("/", authMiddleware, async (req, res) => {
    //@ts-ignore
    try {
        //@ts-ignore
        const id = req.id;
        const zaps = await prisma.zap.findMany({
            where: {
                userId: id
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        console.log("zaps handler");
        return res.json({
            zaps
        });
    }
    catch (e) {
        res.status(500).json({
            message: "issue in getting zaps of the user"
        });
    }
});
router.get("/:zapId", authMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        const zapId = req.params.id;
        const zap = await prisma.zap.findMany({
            where: {
                //@ts-ignore
                id: zapId,
                userId: id
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        console.log("zaps handler");
        return res.json({
            zap
        });
    }
    catch (e) {
        res.status(500).json({
            message: "error in getting this zap for the user"
        });
    }
});
export const zapRouter = router;
//# sourceMappingURL=zap.js.map