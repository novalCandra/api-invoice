import { faker } from "@faker-js/faker";

export function conversationDumy() {
    return {
        userId: faker.number.int({
            min: 1,
            max: 10
        }),
        clientId: faker.number.int({
            min: 1,
            max: 10
        }),
        client_name: faker.internet.username(),
        subject: faker.lorem.sentence(),
    }
}