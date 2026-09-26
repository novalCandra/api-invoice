export class InvoiceResponseDTO {
    id;
    clientName;
    amount;
    status;
    date;
    dueDate;
    description;
    notes;
    client;
    user;
    items;
    customization;
    constructor(invoice) {
        this.id = `INV-00${invoice.id}`;
        this.clientName = invoice.client_name;
        this.amount = Number(invoice.amount);
        this.status = invoice.status;
        this.date = invoice.date;
        this.dueDate = invoice.dueData;
        this.description = invoice.description;
        this.notes = invoice.notes;
        this.client = {
            id: invoice.client.id,
            nama: invoice.client.nama,
            email: invoice.client.email,
            phone: invoice.client.phone,
            company: invoice.client.compay
        };
        this.user = {
            id: invoice.user.id,
            nama: invoice.user.nama
        };
        this.items = invoice.items?.map((item) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            unitPrice: Number(item.unit_price),
            amount: Number(item.amount)
        }));
        const customization = invoice.customization?.[0];
        this.customization = customization
            ? {
                textColor: customization.text_color,
                backgroundColor: customization.background_color,
                accentColor: customization.accent_color,
                customColors: customization.custom_colors
            }
            : null;
    }
}
