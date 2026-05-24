import { invoice_status } from "../generated/prisma/enums.js";
import prisma from "../config/prisma.js";
export const AllInvoiceData = async (userId: number, clientId: number) => {
    const InvoiceAll = await prisma.invoice.findMany({
        where: {
            userId,
            ...(clientId && { clientId })
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
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
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
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
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

export const postInvoiceServices = async (userId: number, clientId: number, body: { client_name: string, status: string, amount: number, date: string, dueData: string, description: string, notes: string }) => {
    const { client_name, status, amount, date, dueData, description, notes } = body;
    const createInvoice = await prisma.invoice.create({
        data: {
            client_name, status: status as invoice_status, amount, date: new Date(date), dueData: new Date(dueData), description, notes, user: {
                connect: {
                    id: userId
                },
            }, client: {
                connect: {
                    id: clientId
                }
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true
                }
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
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