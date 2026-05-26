import prisma from "../config/prisma.js"
import { payments_method } from "../generated/prisma/enums.js";
import { PaymentReponseDto } from "../src/dto/paymento.dto.js";
export const getPaymentAllService = async (userId: number) => {
    const getAllPayment = await prisma.payments.findMany({
        where: {
            userId
        },
        include: {
            user: true,
            invoice: true,
        },
    })
    return getAllPayment.map(
        (getAllPayment) => new PaymentReponseDto(getAllPayment)
    )
}

export const createPaymentService = async (userId: number, invoiceId: number, body: { amount: number, paymentMethod: payments_method, referenceNumber: string, paymentDate: Date, notes: string }) => {
    const { amount, paymentMethod, referenceNumber, paymentDate, notes } = body;
    const createPayment = await prisma.payments.create({
        data: {
            amount, payment_method: paymentMethod, referencer_number: referenceNumber, payment_date: new Date(paymentDate),
            user: {
                connect: {
                    id: userId
                }
            },
            invoice: {
                connect: {
                    id: invoiceId
                }
            }
        },
    })
    return new PaymentReponseDto(createPayment);
}


export const updatePaymentService = async (userId: number, invoiceId: number, id: number, body: { amount: number, paymentMethod: payments_method, referenceNumber: string, paymentDate: Date }) => {
    const { amount, paymentMethod, referenceNumber, paymentDate } = body;
    const updatePayment = await prisma.payments.update({
        where: {
            id
        },
        data: {
            amount, payment_method: paymentMethod, referencer_number: referenceNumber, payment_date: new Date(paymentDate),
            user: {
                connect: {
                    id: userId
                }
            },
            invoice: {
                connect: {
                    id: invoiceId
                }
            }
        },
    })
    return new PaymentReponseDto(updatePayment);
}

export const deletePaymentService = async (id: number) => {
    const deletePayment = await prisma.payments.delete({
        where: {
            id
        }
    })

    return deletePayment;
}