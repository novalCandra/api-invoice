import prisma from "../config/prisma.js";
import { ClienResponCreateDto, clientResponDto } from "../src/dto/clien.dto.js";
export const getAllServiceClient = async (invoiceId) => {
    const dataClient = await prisma.client.findMany({
        where: {
            ...(invoiceId && {
                invoices: {
                    some: {
                        id: invoiceId
                    }
                }
            })
        },
        include: {
            invoices: {
                select: {
                    id: true,
                    amount: true,
                    status: true,
                    date: true
                }
            }
        }
    });
    return dataClient.map((dataClient) => new clientResponDto(dataClient));
};
export const createServiceClient = async (body) => {
    const { nama, email, address, company, phone } = body;
    const createClient = await prisma.client.create({
        data: {
            nama, email, address, compay: company, phone
        }
    });
    return new ClienResponCreateDto(createClient);
};
