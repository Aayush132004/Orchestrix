import prisma from "./index.js";
async function main() {
    try {
        // Clear dependent data to avoid duplicate key errors
        await prisma.action.deleteMany({});
        await prisma.trigger.deleteMany({});
        await prisma.availableTriggers.deleteMany({});
        await prisma.availableAction.deleteMany({});
        await prisma.availableTriggers.create({
            data: {
                id: "webhook",
                name: "Webhook",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQtyw3YP4pW8owoHsGyCI2o8POL2m7Hf9NA&s"
            }
        });
        await prisma.availableAction.createMany({
            data: [
                {
                    id: "send-email",
                    name: "Send Email",
                    image: "https://thumbs.dreamstime.com/b/gmail-email-logo-icon-beautiful-meticulously-designed-225149202.jpg"
                },
                {
                    id: "http-request",
                    name: "HTTP Request",
                    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTNlNjM1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE2IDRsNCA0LTQgNCIvPjxwYXRoIGQ9Ik0yMCA4SDQiLz48cGF0aCBkPSJNOCAyMGwtNC00IDQtNCIvPjxwYXRoIGQ9Ik00IDE2aDE2Ii8+PC9zdmc+"
                },
                {
                    id: "ai-action",
                    name: "AI Block",
                    image: "https://cdn-icons-png.flaticon.com/512/4616/4616734.png"
                },
                {
                    id: "discord-webhook",
                    name: "Send Discord Webhook",
                    image: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
                }
            ]
        });
        console.log("Database seeded successfully.");
    }
    catch (e) {
        console.error("Error during database seed:", e);
    }
}
main();
//# sourceMappingURL=seed.js.map