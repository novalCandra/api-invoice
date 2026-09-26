export class ResponGetAktivitasDTO {
    id;
    eventType;
    eventName;
    description;
    invoiceId;
    clientName;
    amount;
    date;
    time;
    createdAt;
    invoive;
    constructor(AktivitasType) {
        this.id = AktivitasType.id;
        this.eventType = AktivitasType.event_type;
        this.eventName = AktivitasType.event_name;
        this.description = AktivitasType.description;
        this.invoiceId = AktivitasType.invoiceId;
        this.clientName = AktivitasType.client_name;
        this.amount = AktivitasType.amount;
        this.date = AktivitasType.event_date;
        this.time = AktivitasType.event_time;
        this.createdAt = AktivitasType.create_at;
        this.invoive = {
            clientName: AktivitasType.invoice?.client_name,
            date: AktivitasType.invoice?.date,
            description: AktivitasType.invoice?.description
        };
    }
}
export class ResponseInvoiveGetAktivitasDTO {
    id;
    eventType;
    eventName;
    constructor(AktivitasInvoive) {
        this.id = AktivitasInvoive.id;
        this.eventType = AktivitasInvoive.event_type;
        this.eventName = AktivitasInvoive.event_name;
    }
}
