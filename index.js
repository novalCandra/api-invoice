import express from "express"
import dotenv from "dotenv"
import AuthRouter from "./router/AuthRouter.js";
const app = express();
const port = 2000;

dotenv.config();
app.use(express.json())

app.use("/api", AuthRouter);
app.get("/", (req, res) => {
    res.send("EXPRESS INVOICE")
})

app.listen(port, () => {
    console.log(`BE BERJALAN PORT : ${port}`)
})