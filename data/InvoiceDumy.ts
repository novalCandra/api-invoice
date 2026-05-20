import { faker } from "@faker-js/faker";

export function RandomDataInvoive() {
    return {
        clientNama: faker.internet.username(),
        status: faker.helpers.arrayElement(['paid', 'pending', 'overide']),
        amount: faker.number.int({
            min: 100000,
            max: 100000,
        }),
        date: faker.date.anytime(),
        dueData: faker.date.anytime()
    }
}