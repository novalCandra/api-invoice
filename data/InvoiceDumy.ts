import { faker } from "@faker-js/faker";

export function RandomDataInvoive() {
    return {
        userId: faker.number.int({
            min: 1,
            max: 10
        }),
        status: faker.helpers.arrayElement(['paid', 'pending', 'overide']),
        amount: faker.number.int({
            min: 100000,
            max: 100000,
        }),
        date: faker.date.anytime(),
        dueData: faker.date.anytime(),
        clientId: faker.number.int({
            min: 1,
            max: 10
        }),
        client_name: faker.internet.username(),
        description: faker.lorem.sentence(),
        notes: faker.lorem.sentence(),
        paid_at: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
    }
}