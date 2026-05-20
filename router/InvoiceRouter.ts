import express from "express"
import { getAllInvoice, getAllInvoiceDetails, postInvoice } from "../controller/InvoiceController.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { SchemaInvoice } from "../utils/Schema.js";
const InvoiceRouter = express.Router();
InvoiceRouter.get("/invoices", VerifyToken, getAllInvoice)
InvoiceRouter.get("/invoices/:id", VerifyToken, getAllInvoiceDetails)
InvoiceRouter.post("/invoices", ValidateMiddleware(SchemaInvoice), VerifyToken, postInvoice)
export default InvoiceRouter;