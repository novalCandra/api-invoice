import { payments_method } from "../../generated/prisma/enums.js";

export class PaymentReponseDto {
    id: number;
    invoiceId: string | number;
    amount: number;
    paymentMethod: payments_method;
    referenceNumber: string | number;
    paymentDate: Date;
    createdAt: Date;
    constructor(PaymentInvoive: any) {
        this.id = PaymentInvoive.id;
        this.invoiceId = PaymentInvoive.invoiceId
        this.amount = PaymentInvoive.amount
        this.paymentMethod = PaymentInvoive.payment_method
        this.referenceNumber = PaymentInvoive.referencer_number
        this.paymentDate = new Date(PaymentInvoive.payment_date)
        this.createdAt = new Date(PaymentInvoive.create_at)
        this.invoiceId = PaymentInvoive.invoiceId
    }
}