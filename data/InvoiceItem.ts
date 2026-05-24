import { faker } from "@faker-js/faker";

export function dataDumyInvoiceItem() {
    return {
        description: faker.lorem.sentence(),
        quantity: faker.number.int({
            min: 1,
            max: 10
        }),
        unit_price: faker.number.int({
            min: 1,
            max: 10
        }),
        amount: faker.number.int({
            min: 1,
            max: 10
        }),
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        }),
        userId: faker.number.int({
            min: 1,
            max: 10
        })
    }
}