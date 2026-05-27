import prisma from "../config/prisma.js"
import { reminder_type_Invoice } from "../generated/prisma/enums.js";
import { ResponInvoiceReminderDTO } from "../src/dto/invoiceReminder.js";
export const getAllInvoiceReminderService = async (id: number) => {
    const getAllServices = await prisma.invoice_reminders.findMany({
        where: {
            id
        },
        include: {
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

    if (!getAllServices) {
        const error = new Error("Set Internal Erorr Invoice Remimder");
        throw error;
    }
    return getAllServices.map((getAllServices) => new ResponInvoiceReminderDTO(getAllServices))
}
export const CreateInoiceRemimberService = async (invoiceId: number, body: { reminderType: reminder_type_Invoice }) => {
    const { reminderType } = body;
    const createInvoiceRemimvber = await prisma.invoice_reminders.create({
        data: {
            invoiceId,
            reminder_type: reminderType,
        },
    })

    return new ResponInvoiceReminderDTO(createInvoiceRemimvber)
} 