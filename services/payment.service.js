import prisma from "../config/prisma.js";
import { PaymentReponseDto } from "../src/dto/paymento.dto.js";
export const getPaymentAllService = async (userId) => {
    const getAllPayment = await prisma.payments.findMany({
        where: {
            userId
        },
        include: {
            user: true,
            invoice: true,
        },
    });
    return getAllPayment.map((getAllPayment) => new PaymentReponseDto(getAllPayment));
};
export const createPaymentService = async (userId, invoiceId, body) => {
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
    });
    return new PaymentReponseDto(createPayment);
};
export const updatePaymentService = async (userId, invoiceId, id, body) => {
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
    });
    return new PaymentReponseDto(updatePayment);
};
export const deletePaymentService = async (id) => {
    const deletePayment = await prisma.payments.delete({
        where: {
            id
        }
    });
    return deletePayment;
};
