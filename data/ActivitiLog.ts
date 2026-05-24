import { faker } from "@faker-js/faker";

export function ActivitiyLogDumy() {
    return {
        userId: faker.number.int({
            min: 1,
            max: 10
        }),
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        }),
        event_type: faker.helpers.arrayElement(['created', 'paid', 'pending', 'overdue', 'modified', 'sent', 'viewed', 'downloaded']),
        event_name: faker.internet.username(),
        description: faker.lorem.sentence(),
        details: faker.lorem.paragraph(),
        client_name: faker.internet.username(),
        amount: faker.finance.amount({ min: 10, max: 1000 }),
        event_date: faker.date.anytime(),
        event_time: faker.date.soon(),
    }
}