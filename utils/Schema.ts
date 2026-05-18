import z from "zod";

export const SchemaRegister = z.object({
    nama: z.string().min(1, "wajib mengisi nama").max(255, "Maximal 255 Karakter"),
    email: z.string().email(),
    password: z.string()
})

export const SchameLogin = SchemaRegister.omit({ nama: true })

export const SchemaInvoice = z.object({
    clientNama: z.string().min(1, "Clinet name wajib diisi").max(255, "Maximal 255 Karakter"),
    status: z.enum(['paid', 'pending', 'overide']),
    amount: z.number().int(),
    date: z.string().date(),
    dueData: z.string().date()
})