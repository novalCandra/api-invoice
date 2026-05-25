import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { getAllInvoiceItemControllers, deleteInvoiceItemsController, updateInvoiceItemController, postInvoiceItemController } from "../controller/InvoiceItemController.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { schemaInvoiceItem } from "../utils/Schema.js";

const InvoiceItemRouter = express.Router();
InvoiceItemRouter.get("/invoices/:id/items", VerifyToken, getAllInvoiceItemControllers)
InvoiceItemRouter.post("/invoices/:id/items", ValidateMiddleware(schemaInvoiceItem), VerifyToken, postInvoiceItemController)
InvoiceItemRouter.put("/invoices/:id/items", ValidateMiddleware(schemaInvoiceItem), VerifyToken, updateInvoiceItemController)
InvoiceItemRouter.delete("/invoices/:id/items", VerifyToken, deleteInvoiceItemsController)

export default InvoiceItemRouter;