import { faker } from "@faker-js/faker";

export function PaymentDumy() {
    return {
        userId: faker.number.int({
            min: 1,
            max: 10
        }),
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        }),
        amount: faker.finance.amount({ min: 5, max: 255 }),
        payment_method: faker.helpers.arrayElement(['bank_transfer', 'credit_card', 'check', 'cash', 'other']),
        referencer_number: faker.phone.number(),
        notes: faker.lorem.sentence(),
        payment_date: faker.date.between({ from: '2020-01-01', to: '2030-01-01' }),
    }
}