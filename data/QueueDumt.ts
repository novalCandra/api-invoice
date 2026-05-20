import { faker } from "@faker-js/faker";

export function DataDumyQueque() {
    return {
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        }),
        total_pending: faker.number.int({
            min: 1,
            max: 10
        }),
        overdue: faker.number.int({
            min: 1,
            max: 10
        }),
        total_amount: faker.number.int({
            min: 1,
            max: 10
        })
    }
}