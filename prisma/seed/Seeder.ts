import { includes } from "zod";
import prisma from "../../config/prisma.js";
import { ClienDataDumy } from "../../data/ClienDumy.js";
import { RandomDataInvoive } from "../../data/InvoiceDumy.js";
import { RandomDumyUser } from "../../data/UserDumy.js";
import { dataDumyInvoiceItem } from "../../data/InvoiceItem.js";
import { dataDumyInvoiceReminder } from "../../data/InvoiceReminderDumy.js";
import { PaymentDumy } from "../../data/PaymentDumy.js";
import { user_preferencesDumy } from "../../data/user_preferencesDumy.js";
import { ActivitiyLogDumy } from "../../data/ActivitiLog.js";
import { DumyInvoiceCustomization } from "../../data/invoiceCustomization.js";
import { conversationDumy } from "../../data/conversationDumy.js";
console.log("check data seeder")
export async function main() {
    try {
        const user = [];
        const client = [];
        const invoices = [];
        const invoicesItems = [];
        const invoicesRemimbers = [];
        const invoice_customization = [];
        const payments = [];
        const userPreferences = [];
        const logAktivitas = [];
        const conversation = [];
        for (let i = 0; i < 3; i++) {
            const userData = await RandomDumyUser();
            const randomCreateUser = await prisma.user.create({
                data: userData
            })
            user.push(randomCreateUser)
        }

        for (let i = 0; i < 3; i++) {
            const clientData = await ClienDataDumy();
            const randomClient = await prisma.client.create({
                data: clientData
            })
            client.push(randomClient)
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomClient = client[Math.floor(Math.random() * client.length)];
            const randomInvoice = await prisma.invoice.create({
                data: {
                    ...RandomDataInvoive(),
                    userId: randomUser.id,
                    clientId: randomClient.id
                }
            })

            invoices.push(randomInvoice)
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomInvoices = invoices[Math.floor(Math.random() * invoices.length)];
            const randomInvoiceItems = await prisma.invoice_items.create({
                data: {
                    ...dataDumyInvoiceItem(),
                    userId: randomUser.id,
                    invoiceId: randomInvoices.id
                }
            })
            invoicesItems.push(randomInvoiceItems)
        }

        for (let i = 0; i < 3; i++) {
            const randomInvoices = invoices[Math.floor(Math.random() * invoices.length)];
            const randomInvoivesRemimvbers = await prisma.invoice_reminders.create({
                data: {
                    ...dataDumyInvoiceReminder(),
                    invoiceId: randomInvoices.id
                }
            })

            invoicesRemimbers.push(randomInvoivesRemimvbers)
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomPayments = await prisma.payments.create({
                data: {
                    ...PaymentDumy(),
                    userId: randomUser.id
                }
            })

            payments.push(randomPayments);
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomuserPreferences = await prisma.user_preferences.create({
                data: {
                    ...user_preferencesDumy(),
                    userId: randomUser.id
                }
            })
            userPreferences.push(randomuserPreferences)
        }


        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomInvoices = invoices[Math.floor(Math.random() * invoices.length)];
            const randomDataLog = await prisma.activity_log.create({
                data: {
                    ...ActivitiyLogDumy(),
                    userId: randomUser.id,
                    invoiceId: randomInvoices.id
                }
            })
            logAktivitas.push(randomDataLog)
        }

        for (let i = 0; i < 3; i++) {
            const randomInvoice = invoices[Math.floor(Math.random() * invoices.length)];
            const dataRandomInvoiceTheme = await prisma.invoice_customizations.create({
                data: {
                    ...DumyInvoiceCustomization(),
                    invoiceId: randomInvoice.id
                }
            })

            invoice_customization.push(dataRandomInvoiceTheme);
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomCliet = client[Math.floor(Math.random() * client.length)];

            const randomconversations = await prisma.conversations.create({
                data: {
                    ...conversationDumy(),
                    userId: randomUser.id,
                    clientId: randomCliet.id
                }
            })

            conversation.push(randomconversations)
        }
        console.log('✅ Success Create Seeder')
    } catch (error) {
        console.error(error)
    }
}
main();