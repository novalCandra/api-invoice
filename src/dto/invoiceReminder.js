export class ResponInvoiceReminderDTO {
    id;
    invoiceId;
    reminderType;
    sentAt;
    create_at;
    constructor(InvoiceTemimberType) {
        this.id = InvoiceTemimberType.id;
        this.invoiceId = InvoiceTemimberType.invoiceId;
        this.reminderType = InvoiceTemimberType.reminder_type;
        this.sentAt = InvoiceTemimberType.sent_at;
        this.create_at = InvoiceTemimberType.create_at;
    }
}
