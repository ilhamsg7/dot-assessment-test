import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const userSeeder = async () => {
    try {
        for (let i = 0; i < 10; i++) {
            await prisma.user.createMany({
                data: {
                    userName: faker.internet.username(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                }
            });
        }
        console.log(`Database has been seeded. 🌱`)
    } catch (error) {
        console.log(error);
    }
}

userSeeder().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});

export default userSeeder;