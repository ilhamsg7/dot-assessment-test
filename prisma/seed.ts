import { PrismaClient } from "@prisma/client";
import userSeeder from "./seeder/user.seeder";

const prisma = new PrismaClient();

Promise.all([userSeeder()])
    .then(async () => {
        console.log("Database has been seeded. 🌱");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.warn("Error While generating Seed: \n", e);
        await prisma.$disconnect();
        process.exit(1);
    });