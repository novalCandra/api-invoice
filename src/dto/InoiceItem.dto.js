export class InvoiceItemRespoDto {
    id;
    invoiceId;
    description;
    quantity;
    amount;
    unitPrice;
    user;
    invoice;
    constructor(invoiceItem) {
        this.id = invoiceItem.id;
        this.invoiceId = `INV-00${invoiceItem.invoiceId}`;
        this.description = invoiceItem.description;
        this.quantity = invoiceItem.quantity;
        this.amount = invoiceItem.amount;
        this.unitPrice = invoiceItem.unit_price;
        this.user = {
            id: invoiceItem.user.id,
            nama: invoiceItem.user.id
        };
        this.invoice = {
            id: invoiceItem.invoice.id
        };
    }
}
