import { faker } from "@faker-js/faker";

export function RandomHistoryDataDumy() {
    return {
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        }),
        total_event: faker.number.int({
            min: 1, max: 10
        }),
        payment_method: faker.number.int({
            min: 1, max: 10
        }),
        overdue: faker.number.int({
            min: 1, max: 10
        }),
        userId: faker.number.int({
            min: 1, max: 10
        })
    }
}