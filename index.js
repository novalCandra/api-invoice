import express from "express"
const app = express();
const port = 2000;

app.get("/", (req, res) => {
    res.send("EXPRESS INVOICE")
})

app.listen(port, () => {
    console.log(`BE BERJALAN PORT : ${port}`)
})