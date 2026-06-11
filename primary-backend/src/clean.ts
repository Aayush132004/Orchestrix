import prisma from "./db/index.js";

async function main() {
    console.log("Fetching zaps...");
    const zaps = await prisma.zap.findMany({
        include: {
            trigger: true,
            actions: true
        }
    });
    
    console.log(`Found ${zaps.length} total zaps.`);
    let deletedCount = 0;
    
    for (const zap of zaps) {
        if (!zap.trigger || !zap.actions || zap.actions.length === 0) {
            console.log(`Deleting incomplete zap ID: ${zap.id}`);
            
            // Delete outbox entries
            await prisma.zapRunOutbox.deleteMany({
                where: {
                    zapRun: {
                        zapId: zap.id
                    }
                }
            });
            // Delete run entries
            await prisma.zapRuns.deleteMany({
                where: { zapId: zap.id }
            });
            // Delete action relations just in case
            await prisma.action.deleteMany({
                where: { zapId: zap.id }
            });
            // Delete trigger relations just in case
            await prisma.trigger.deleteMany({
                where: { zapId: zap.id }
            });
            // Delete the zap itself
            await prisma.zap.delete({
                where: { id: zap.id }
            });
            deletedCount++;
        }
    }
    
    console.log(`Cleaned up ${deletedCount} incomplete zaps.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
