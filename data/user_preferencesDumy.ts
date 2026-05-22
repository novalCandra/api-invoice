import { faker } from "@faker-js/faker";

export function user_preferencesDumy() {
    return {
        theme: faker.helpers.arrayElement(['dark', 'light']),
        notifications_enabled: faker.datatype.boolean(),
        email_reminders_enabled: faker.datatype.boolean(0.9),
        language: faker.location.language().name,
        timezone: faker.location.timeZone(),
        company_name: faker.company.name(),
        company_logo_url: faker.image.avatarGitHub(),
        default_payment_terms_days: faker.number.int({
            min: 1,
            max: 10
        })
    }
}