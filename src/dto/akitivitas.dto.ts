export class ResponGetAktivitasDTO {
    id: number;
    eventType: string;
    eventName: string;
    description: string;
    invoiceId: number | string;
    clientName: string;
    amount: string;
    date: Date;
    time: Date;
    createdAt: Date

    constructor(AktivitasType: any) {
        this.id = AktivitasType.id
        this.eventType = AktivitasType.event_type
        this.eventName = AktivitasType.event_name
        this.description = AktivitasType.description
        this.invoiceId = AktivitasType.invoiceId
        this.clientName = AktivitasType.client_name
        this.amount = AktivitasType.amount
        this.date = AktivitasType.event_date
        this.time = AktivitasType.event_time
        this.createdAt = AktivitasType.create_at
    }
}


export class ResponseInvoiveGetAktivitasDTO {
    id: number | string;
    eventType: string;
    eventName: string;

    constructor(AktivitasInvoive: any) {
        this.id = AktivitasInvoive.id
        this.eventType = AktivitasInvoive.event_type
        this.eventName = AktivitasInvoive.event_name
    }
}