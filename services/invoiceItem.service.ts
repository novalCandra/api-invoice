import prisma from "../config/prisma.js"
import { InvoiceItemRespoDto } from "../src/dto/InoiceItem.dto.js";
import { NotFoundError } from "../src/errors/not-found-error.js";
export const getDataInvoiceItemServices = async (userId: number, invoiceId: number) => {
    const getAllInvoice = await prisma.invoice_items.findMany({
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
            invoice: {
                select: {
                    id: true,
                }
            }
        }
    })

    if (getAllInvoice.length === 0) {
        throw new NotFoundError(
            `Invoice with ID ${invoiceId} not found`
        )
    }
    return getAllInvoice.map(
        item => new InvoiceItemRespoDto(item)
    );
}

export const postDataInvoiceItem = async (userId: number, invoiceId: number, body: { description: string, quantity: number, unitPrice: number }) => {
    const { description, quantity, unitPrice } = body;
    const createInvoiceItems = await prisma.invoice_items.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            invoice: {
                connect: {
                    id: invoiceId
                }
            },
            description, quantity, unit_price: unitPrice
        },
    })
    return new InvoiceItemRespoDto(createInvoiceItems);
}

export const updateDataInvoice = async (id: number, body: { description: string, quantity: number, unitPrice: number }) => {
    const { description, quantity, unitPrice } = body;
    const updateDataInvoiceItem = await prisma.invoice_items.update({
        where: {
            id
        },
        data: {
            description, quantity, unit_price: unitPrice
        }
    })

    if (!updateDataInvoice) {
        const error = new Error("Failed Not Update Invoice Item");
        throw error;
    }
    return updateDataInvoiceItem;
}
export const deleteInvoiceItem = async (id: number) => {
    const deleteInvoiceItems = await prisma.invoice_items.delete({
        where: {
            id: Number(id)
        }
    })
    return deleteInvoiceItems;
}