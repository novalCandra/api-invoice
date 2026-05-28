import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AuthRouter from "./router/AuthRouter.js";
import InvoiceRouter from "./router/InvoiceRouter.js";
import ClientRouter from "./router/ClientRouter.js"
import InvoicecustomizationRouter from "./router/InvoiceCustomizationRouter.js";
import PaymentRouter from "./router/PaymentRouter.js";
import activititasRouter from "./router/LogAktvititasRouter.js";
import InvoiceItemRouter from "./router/InvoiceItemRouter.js";
import InvoiceReminderRouter from "./router/InvoiceReminderRouter.js";
import userPreferenceRouter from "./router/userPreferenceRouter.js";
import conversationRouter from "./router/conversationRouter.js"
import puppeteer from "puppeteer";
const app = express();
const port = 2000;

dotenv.config();
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    credentials: true
}))
app.use("/api", AuthRouter);
app.use("/api", ClientRouter)
app.use("/api", InvoiceRouter);
app.use("/api", InvoicecustomizationRouter);
app.use("/api", InvoicecustomizationRouter);
app.use("/api", PaymentRouter);
app.use("/api", activititasRouter);
app.use("/api", InvoiceItemRouter);
app.use("/api", InvoiceReminderRouter);
app.use("/api", userPreferenceRouter);
app.use("/api", conversationRouter)
app.get("/", (req, res) => {
    res.send("EXPRESS INVOICE")
})

app.listen(port, () => {
    console.log(`BE BERJALAN PORT : ${port}`)
})