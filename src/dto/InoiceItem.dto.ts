export class InvoiceItemRespoDto {
    id: number | string;
    invoiceId: string;
    description: string;
    quantity: number;
    amount: number;
    unitPrice: number
    user: {
        id: number;
        nama: string;
    };
    invoice: {
        id: number
    }


    constructor(invoiceItem: any) {
        this.id = invoiceItem.id;
        this.invoiceId = `INV-00${invoiceItem.invoiceId}`;
        this.description = invoiceItem.description;
        this.quantity = invoiceItem.quantity;
        this.amount = invoiceItem.amount;
        this.unitPrice = invoiceItem.unit_price;
        this.user = {
            id: invoiceItem.user.id,
            nama: invoiceItem.user.id
        }
        this.invoice = {
            id: invoiceItem.invoice.id
        }
    }
}