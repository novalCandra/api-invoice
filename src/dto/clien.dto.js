export class clientResponDto {
    id;
    nama;
    email;
    compay;
    phone;
    invoices;
    constructor(clientType) {
        this.id = clientType.id;
        this.nama = clientType.nama;
        this.email = clientType.email;
        this.compay = clientType.compay;
        this.phone = clientType.phone;
        this.invoices = clientType.invoices?.map((item) => ({
            id: item.id,
            amount: item.amount,
            status: item.status,
            date: item.date,
            dueDate: item.invoices
        })) || [];
    }
}
export class ClienResponCreateDto {
    id;
    nama;
    email;
    compay;
    phone;
    constructor(createClient) {
        this.id = createClient.id;
        this.nama = createClient.nama;
        this.email = createClient.email;
        this.compay = createClient.comapy;
        this.phone = createClient.phone;
    }
}
