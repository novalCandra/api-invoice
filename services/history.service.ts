import prisma from "../config/prisma.js"
export const getAllServicesHistory = async (userId: number | undefined, invoiceId: number | undefined) => {
    const dataHistory = await prisma.history.findMany({
        where: {
            ...(userId && { userId }),
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
            invoices: {
                select: {
                    id: true, amount: true, clientNama: true, date: true, dueData: true,
                    histories: true, status: true, queue: true
                }
            }
        }
    })

    if (!dataHistory) {
        const error = new Error("Not get History")
        throw error
    }
    return dataHistory;
}