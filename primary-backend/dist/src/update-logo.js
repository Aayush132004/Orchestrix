import prisma from "./db/index.js";
async function main() {
    console.log("Updating HTTP Request icon in database...");
    const updated = await prisma.availableAction.update({
        where: { id: "http-request" },
        data: { image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTNlNjM1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE2IDRsNCA0LTQgNCIvPjxwYXRoIGQ9Ik0yMCA4SDQiLz48cGF0aCBkPSJNOCAyMGwtNC00IDQtNCIvPjxwYXRoIGQ9Ik00IDE2aDE2Ii8+PC9zdmc+" }
    });
    console.log("Updated action:", updated);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=update-logo.js.map