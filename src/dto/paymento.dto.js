export class PaymentReponseDto {
    id;
    invoiceId;
    amount;
    paymentMethod;
    referenceNumber;
    paymentDate;
    createdAt;
    constructor(PaymentInvoive) {
        this.id = PaymentInvoive.id;
        this.invoiceId = PaymentInvoive.invoiceId;
        this.amount = PaymentInvoive.amount;
        this.paymentMethod = PaymentInvoive.payment_method;
        this.referenceNumber = PaymentInvoive.referencer_number;
        this.paymentDate = new Date(PaymentInvoive.payment_date);
        this.createdAt = new Date(PaymentInvoive.create_at);
        this.invoiceId = PaymentInvoive.invoiceId;
    }
}
