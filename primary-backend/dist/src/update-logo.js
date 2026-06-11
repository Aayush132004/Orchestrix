import prisma from "./db/index.js";
async function main() {
    console.log("Updating HTTP Request icon in database...");
    const updated = await prisma.availableAction.update({
        where: { id: "http-request" },
        data: { image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png" }
    });
    console.log("Updated action:", updated);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=update-logo.js.map