export class clientResponDto {
    id: number;
    nama: string;
    email: string;
    compay: string;
    phone: string;

    invoices: {
        id: string;
        amount: number
        status: string;
        date: Date;
        dueDate: Date;
    }[]

    constructor(clientType: any) {
        this.id = clientType.id;
        this.nama = clientType.nama
        this.email = clientType.email
        this.compay = clientType.compay
        this.phone = clientType.phone

        this.invoices = clientType.invoices?.map((item: any) => ({
            id: item.id,
            amount: item.amount,
            status: item.status,
            date: item.date,
            dueDate: item.invoices
        })) || []
    }
}

export class ClienResponCreateDto {
    id: number;
    nama: string;
    email: string;
    compay: string;
    phone: string;
    constructor(createClient: any) {
        this.id = createClient.id
        this.nama = createClient.nama
        this.email = createClient.email
        this.compay = createClient.comapy
        this.phone = createClient.phone
    }
}