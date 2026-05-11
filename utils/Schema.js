import z from "zod";

export const SchemaRegister = z.object({
    nama: z.string().min(1, "wajib mengisi nama").max(255, "Maximal 255 Karakter"),
    email: z.string().email(),
    password: z.string()
})

export const SchameLogin = SchemaRegister.omit({ nama: true })