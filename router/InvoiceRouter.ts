import express from "express"
import { deleteInvoiceController, getAllInvoice, getAllInvoiceDetails, postInvoice, updateInvoiceController, PDFGetInvoice } from "../controller/InvoiceController.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { SchemaInvoice } from "../utils/Schema.js";
const InvoiceRouter = express.Router();
InvoiceRouter.get("/invoices", VerifyToken, getAllInvoice);
InvoiceRouter.get("/invoices/:id", VerifyToken, getAllInvoiceDetails);
InvoiceRouter.get("/invoices/pdf/:id", VerifyToken, PDFGetInvoice);
InvoiceRouter.put("/invoices/:id", ValidateMiddleware(SchemaInvoice), VerifyToken, updateInvoiceController)
InvoiceRouter.delete("/invoices/:id", VerifyToken, deleteInvoiceController);
InvoiceRouter.post("/invoices", ValidateMiddleware(SchemaInvoice), VerifyToken, postInvoice);
export default InvoiceRouter;