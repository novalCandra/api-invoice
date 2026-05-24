import { faker } from "@faker-js/faker";

export async function ClienDataDumy() {
    return {

        nama: faker.internet.username(),
        email: faker.internet.email(),
        compay: faker.company.name(),
        phone: faker.phone.number(),
        address: faker.company.name()
    }
}