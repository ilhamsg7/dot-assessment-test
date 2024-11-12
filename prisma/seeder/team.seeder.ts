import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const teamSeeder = async () => {
    try {
        for (let i = 0; i < 10; i++) {
            await prisma.team.createMany({
                data: {
                    teamName: faker.company.name(),
                    teamPrincipal: faker.person.fullName(),
                    chiefEngineer: faker.person.fullName(),
                    base: faker.location.city() + ", " + faker.location.country(),
                },
            });
        }
        console.log(`Database has been seeded. 🌱`);
    } catch (error) {
        console.log(error);
    }
}

teamSeeder().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});

export default teamSeeder;