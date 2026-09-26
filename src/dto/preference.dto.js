export class PreferenceResponDTO {
    id;
    user;
    theme;
    notificationsEnabled;
    emailRemindersEnabled;
    language;
    timezone;
    defaultPaymentTermsDays;
    constructor(prefernceType) {
        this.id = prefernceType.id;
        this.user = {
            id: prefernceType.user.id,
            nama: prefernceType.user.nama
        };
        this.theme = prefernceType.theme;
        this.notificationsEnabled = prefernceType.notifications_enabled;
        this.emailRemindersEnabled = prefernceType.email_reminders_enabled;
        this.language = prefernceType.language;
        this.timezone = prefernceType.timezone;
        this.defaultPaymentTermsDays = prefernceType.default_payment_terms_days;
    }
}
export class PreferenceUpdateDto {
    id;
    theme;
    notificationsEnabled;
    emailRemindersEnabled;
    language;
    timezone;
    defaultPaymentTermsDays;
    constructor(prefernceType) {
        this.id = prefernceType.id;
        this.theme = prefernceType.theme;
        this.notificationsEnabled = prefernceType.notifications_enabled;
        this.emailRemindersEnabled = prefernceType.email_reminders_enabled;
        this.language = prefernceType.language;
        this.timezone = prefernceType.timezone;
        this.defaultPaymentTermsDays = prefernceType.default_payment_terms_days;
    }
}
