import { Request, Response } from "express";
import { AllInvoiceData, InvoiceDataDetails, postInvoiceServices } from "../services/invoice.service.js";
import { errorResponse, successResponse } from "../helper/response.helper.js";
export const getAllInvoice = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const clientId = Number(req.client?.id)
        const InvoiceAll = await AllInvoiceData(userId, clientId);
        return successResponse(
            res,
            InvoiceAll,
            "Success All Invoices data"
        )
    } catch (error) {
        return errorResponse(
            res
        )
    }
}

export const getAllInvoiceDetails = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const detailInvoice = await InvoiceDataDetails(id)
        return successResponse(
            res,
            detailInvoice,
            "Success Invoice Details"
        )
    } catch (error) {
        return errorResponse(
            res
        )
    }
}

export const postInvoice = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const clientId = Number(req.body.clientId);
        const createInvoice = await postInvoiceServices(userId, clientId, req.body)
        return successResponse(
            res, createInvoice,
            "Success Create Invoice"
        )
    } catch (error) {
        return errorResponse(
            res
        )
    }
}