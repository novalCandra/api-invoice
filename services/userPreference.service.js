import prisma from "../config/prisma.js";
import { PreferenceResponDTO, PreferenceUpdateDto } from "../src/dto/preference.dto.js";
export const userPreferenceServices = async (userId) => {
    const getDataUserPreference = await prisma.user_preferences.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            }
        }
    });
    return getDataUserPreference.map((getDataUserPreference) => new PreferenceResponDTO(getDataUserPreference));
};
export const userPrefrenceServiceUpdate = async (id, body) => {
    const { theme, notificationsEnabled, emailRemindersEnabled, language, timezone, companyName, defaultPaymentTermsDays } = body;
    const updateUserPreferece = await prisma.user_preferences.update({
        where: {
            id
        },
        data: {
            theme, notifications_enabled: notificationsEnabled, email_reminders_enabled: emailRemindersEnabled, language: language, timezone, company_name: companyName, default_payment_terms_days: defaultPaymentTermsDays
        },
    });
    return new PreferenceUpdateDto(updateUserPreferece);
};
