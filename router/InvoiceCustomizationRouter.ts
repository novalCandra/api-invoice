import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { getInvoicecustomizationController, updateInvoiceCustomazationController } from "../controller/InvoiceCustomizationController.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { schemaInvoiceCustom } from "../utils/Schema.js";

const InvoicecustomizationRouter = express.Router();
InvoicecustomizationRouter.get("/invoices/:id/customization", VerifyToken, getInvoicecustomizationController);
InvoicecustomizationRouter.put("/invoices/:id/customization", ValidateMiddleware(schemaInvoiceCustom), VerifyToken, updateInvoiceCustomazationController);
export default InvoicecustomizationRouter;