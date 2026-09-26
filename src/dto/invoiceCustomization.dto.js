export class InvoiceCustomization {
    id;
    invoiceId;
    bgColor;
    textColor;
    accentColor;
    customColors;
    constructor(Customization) {
        this.id = Customization.id;
        this.invoiceId = `INV-00${Customization.invoiceId}`;
        this.bgColor = Customization.background_color;
        this.textColor = Customization.text_color;
        this.accentColor = Customization.accent_color;
        this.customColors = Customization.custom_colors;
    }
}
