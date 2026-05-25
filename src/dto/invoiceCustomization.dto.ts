export class InvoiceCustomization {
    id: number;
    invoiceId: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    customColors: string;

    constructor(Customization: any) {
        this.id = Customization.id;
        this.invoiceId = `INV-00${Customization.invoiceId}`;
        this.bgColor = Customization.background_color;
        this.textColor = Customization.text_color;
        this.accentColor = Customization.accent_color;
        this.customColors = Customization.custom_colors;
    }
}