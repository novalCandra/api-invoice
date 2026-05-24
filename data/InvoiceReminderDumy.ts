import { faker } from "@faker-js/faker";

export function dataDumyInvoiceReminder() {
    return {
        reminder_type: faker.helpers.arrayElement(['first', 'second', 'final']),
        sent_at: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
        invoiceId: faker.number.int({
            min: 1,
            max: 10
        })
    }
}