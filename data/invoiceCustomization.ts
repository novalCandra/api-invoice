import { faker } from "@faker-js/faker";

export function DumyInvoiceCustomization() {
    return {
        background_color: faker.color.rgb(),
        text_color: faker.color.rgb(),
        accent_color: faker.color.rgb(),
        custom_colors: faker.datatype.boolean()
    }
}