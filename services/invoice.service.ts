import { invoice_status } from "../generated/prisma/enums.js";
import prisma from "../config/prisma.js";
export const AllInvoiceData = async (userId: number) => {
    const InvoiceAll = await prisma.invoice.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            }
        }
    });

    if (!InvoiceAll) {
        const error = new Error("Not Invoice All")
        throw error
    }
    return InvoiceAll;
}

export const InvoiceDataDetails = async (id: number) => {
    const detailInvoice = await prisma.invoice.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            }
        }
    })

    if (!detailInvoice) {
        const error = new Error("Not Invoice Details data")
        throw error
    }

    return detailInvoice
}

export const postInvoiceServices = async (userId: number, body: { clientNama: string, status: string, amount: number, date: string, dueData: string }) => {
    const { clientNama, status, amount, date, dueData } = body;
    const createInvoice = await prisma.invoice.create({
        data: {
            clientNama, status: status as invoice_status, amount, date: new Date(date), dueData: new Date(dueData), user: {
                connect: {
                    id: userId
                }
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true
                }
            }
        }
    })

    if (!createInvoice) {
        const error = new Error("False Create Invoice Data");
        throw error
    }
    return createInvoice;
}