import { Request, Response } from "express"
import { errorResponse, successResponse } from "../helper/response.helper.js"
import { CreateInoiceRemimberService, getAllInvoiceReminderService } from "../services/InvoiceReminder.service.js";
export const getAllInvoiceReminderController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const getInvoiceReminder = await getAllInvoiceReminderService(id);
        return successResponse(res, getInvoiceReminder, "Success Get All Invoive Reminder");
    } catch (error) {
        return errorResponse(res);
    }
}

export const createInvoiveRemimverController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.body.invoiceId);
        const createInvoiceRemimber = await CreateInoiceRemimberService(invoiceId, req.body);
        return successResponse(res, createInvoiceRemimber, "Success Create Payment Remimber")
    } catch (error) {
        return errorResponse(res)
    }
}