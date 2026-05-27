import z from "zod";

export const SchemaRegister = z.object({
    nama: z.string().min(1, "wajib mengisi nama").max(255, "Maximal 255 Karakter"),
    email: z.string().email(),
    password: z.string()
})

export const SchameLogin = SchemaRegister.omit({ nama: true })

export const SchemaInvoice = z.object({
    client_name: z.string().min(1, "Clinet name wajib diisi").max(255, "Maximal 255 Karakter"),
    status: z.enum(['paid', 'pending', 'overide']),
    amount: z.number().int(),
    date: z.string().date(),
    dueData: z.string().date(),
    description: z.string().min(1, "wajib diisi").max(255, "maximal 255 karakter"),
    notes: z.string().min(1, "wajib diisi").max(255, "maximal 255 karakter")
})

export const schemaInvoiceItem = z.object({
    description: z.string().min(1, "wAjib diisi").max(255, "maximal 255 karakter"),
    quantity: z.number(),
    unitPrice: z.number(),
})

export const schemaInvoiceCustom = z.object({
    bgColor: z.string().min(1, "Wajib diisi"),
    textColor: z.string().min(1, "Wajib diisi"),
    accentColor: z.string().min(1, "Wajib diisi"),
    customColors: z.boolean()
})

export const schemaPayment = z.object({
    invoiceId: z.number(),
    amount: z.number(),
    paymentMethod: z.string(),
    referenceNumber: z.string(),
    paymentDate: z.coerce.date(),
    notes: z.string()
})

export const schemaClient = z.object({
    address: z.string().min(1, "minimal wajib mengisi"),
    company: z.string().min(1, "minimal wajib mengisi"),
    email: z.email(),
    nama: z.string().min(1, "minimal wajib mengisi"),
    phone: z.string().min(1, "minimal wajib mengisi"),
})

export const SchemaPreference = z.object({
    theme: z.string().min(1, "minimial wajib mengisi theme"),
    notificationsEnabled: z.boolean(),
    emailRemindersEnabled: z.boolean(),
    language: z.string().min(1, "minimal wajib mengisi language"),
    timezone: z.string().min(1, "minimal wajib mengisi timezone"),
    companyName: z.string().min(1, "minimal wajib mengisi company name"),
    defaultPaymentTermsDays: z.number()
})

export const schemaPaymentRemimber = z.object({
    invoiceId: z.number(),
    reminderType: z.string().min(1, "minimal wajib mengisi")
})