import prisma from "../config/prisma.js"
import { InvoiceCustomization } from "../src/dto/invoiceCustomization.dto.js";

export const InvoicecustomizationService = async (invoiceId: number) => {
    const getDataInvoicecustomization = await prisma.invoice_customizations.findFirst({
        where: {
            invoiceId
        },
        include: {
            invoice: true
        }
    })

    return new InvoiceCustomization(getDataInvoicecustomization);
}

export const InvoiceCustomizationUpdateService = async (id: number, body: { bgColor: string, textColor: string, accentColor: string, customColors: boolean }) => {
    const { bgColor, textColor, accentColor, customColors } = body;
    const updateInvoiceCustomization = await prisma.invoice_customizations.update({
        where: {
            id
        },
        data: {
            background_color: bgColor, text_color: textColor, accent_color: accentColor, custom_colors: customColors
        },
        include: {
            invoice: true,
        }
    })
    return new InvoiceCustomization(updateInvoiceCustomization);
}