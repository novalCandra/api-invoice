import prisma from "../config/prisma.js"
import { ResponGetAktivitasDTO, ResponseInvoiveGetAktivitasDTO } from "../src/dto/akitivitas.dto.js";
export const getAllLogAktivitasServices = async (userId: number, invoiceId: number) => {
    const getLogAktivitas = await prisma.activity_log.findMany({
        where: {
            userId,
            ...(invoiceId && { invoiceId })
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            },
            invoice: {
                select: {
                    id: true,
                    client: true,
                    status: true,
                    date: true,
                    client_name: true,
                    description: true,
                    amount: true,
                    notes: true
                }
            }
        }
    })

    if (!getAllLogAktivitasServices) {
        const error = new Error("Error Get All Log Aktivitas");
        throw error
    }

    return getLogAktivitas.map((getLogAktivitas) => new ResponGetAktivitasDTO(getLogAktivitas))
    // return getLogAktivitas
}

export const getAllInvoiceAktivitas = async (invoiceId: number) => {
    const AktivitasInvoice = await prisma.activity_log.findMany({
        where: {
            ...(invoiceId && { invoiceId })
        },
    })

    return AktivitasInvoice.map((AktivitasInvoice) => new ResponseInvoiveGetAktivitasDTO(AktivitasInvoice));
}