import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { createInvoiveRemimverController, getAllInvoiceReminderController } from "../controller/InvoiceReminder.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { schemaPaymentRemimber } from "../utils/Schema.js";

const InvoiceReminderRouter = express.Router();
InvoiceReminderRouter.get("/reminders/:id", VerifyToken, getAllInvoiceReminderController)
InvoiceReminderRouter.post("/reminders", ValidateMiddleware(schemaPaymentRemimber), createInvoiveRemimverController)
export default InvoiceReminderRouter;