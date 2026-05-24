import prisma from "../config/prisma.js"
export const getAllQueueServices = async (invoiceId: number | undefined) => {
    const allQueqe = await prisma.queue.findMany({
        where: {
            invoiceId
        },
        include: {
            invoice: {
                select: {
                    id: true, amount: true, clientNama: true, date: true, dueData: true,
                    histories: true, status: true, queue: true
                }
            }
        }
    })

    if (!allQueqe) {
        const error = new Error("not get Queue Data")
        throw error
    }
    return allQueqe;
}