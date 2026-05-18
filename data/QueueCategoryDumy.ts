import { faker } from "@faker-js/faker";

export async function QueqeDumyCategory() {
    return {
        status: faker.helpers.arrayElement(['urgent', 'pending', 'onTime'])
    }
}