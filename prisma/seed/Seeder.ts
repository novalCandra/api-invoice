import prisma from "../../config/prisma.js";
import { RandomHistoryDataDumy } from "../../data/HistoryDumy.js";
import { RandomDataInvoive } from "../../data/InvoiceDumy.js";
import { QueqeDumyCategory } from "../../data/QueueCategoryDumy.js";
import { DataDumyQueque } from "../../data/QueueDumt.js";
import { RandomDumyUser } from "../../data/UserDumy.js";
console.log("check data seeder")
export async function main() {
    try {
        const user = [];
        const invoice = [];
        const history = [];
        const queue = [];
        const QueueCategory = [];
        for (let i = 0; i < 3; i++) {
            const userData = await RandomDumyUser();
            const randomCreateUser = await prisma.user.create({
                data: userData
            })
            user.push(randomCreateUser)
        }
        for (let i = 0; i < 5; i++) {
            const randomUser =
                user[Math.floor(Math.random() * user.length)];

            const RandomInvoice = await prisma.invoice.create({
                data: {
                    ...RandomDataInvoive(),
                    userId: randomUser.id,
                }
            })

            invoice.push(RandomInvoice);
        }

        for (let i = 0; i < 3; i++) {
            const randomUser = user[Math.floor(Math.random() * user.length)];
            const randomInvoice = invoice[Math.floor(Math.random() * invoice.length)];
            const RandomHistory = await prisma.history.create({
                data: {
                    ...RandomHistoryDataDumy(),
                    userId: randomUser.id,
                    invoiceId: randomInvoice.id
                }
            })

            history.push(RandomHistory)
        }

        for (let i = 0; i < 3; i++) {
            const queueCategory = await QueqeDumyCategory();
            const randomDataQueqeCategory = await prisma.queuecategory.create({
                data: queueCategory
            })
            QueueCategory.push(randomDataQueqeCategory)
        }

        for (let i = 0; i < 5; i++) {
            const randomInvoice = invoice[Math.floor(Math.random() * invoice.length)]
            const randomQueqe = await prisma.queue.create({
                data: {
                    ...DataDumyQueque(),
                    invoiceId: randomInvoice.id
                }
            })
            queue.push(randomQueqe)
        }
        console.log('✅ Success Create Seeder')
    } catch (error) {
        console.error(error)
    }
}
main();