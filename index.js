import express from "express"
import dotenv from "dotenv"
import AuthRouter from "./router/AuthRouter.js";
import InvoiceRouter from "./router/InvoiceRouter.js";
import HistoryRouter from "./router/HistoryRouter.js";
import QueueRouter from "./router/QueueRouter.js"
const app = express();
const port = 2000;

dotenv.config();
app.use(express.json())

app.use("/api", AuthRouter);
app.use("/api", InvoiceRouter)
app.use("/api", HistoryRouter)
app.use("/api", QueueRouter)
app.get("/", (req, res) => {
    res.send("EXPRESS INVOICE")
})

app.listen(port, () => {
    console.log(`BE BERJALAN PORT : ${port}`)
})