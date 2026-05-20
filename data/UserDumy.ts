import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"
export async function RandomDumyUser() {
    return {
        nama: faker.company.name(),
        email: faker.internet.email(),
        password: await bcrypt.hash("password", 10)
    }
}