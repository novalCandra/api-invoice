export class ResponInvoiceReminderDTO {
    id: number | string;
    invoiceId: number;
    reminderType: string;
    sentAt: Date;
    create_at: Date;

    constructor(InvoiceTemimberType: any) {
        this.id = InvoiceTemimberType.id
        this.invoiceId = InvoiceTemimberType.invoiceId
        this.reminderType = InvoiceTemimberType.reminder_type
        this.sentAt = InvoiceTemimberType.sent_at
        this.create_at = InvoiceTemimberType.create_at
    }
}