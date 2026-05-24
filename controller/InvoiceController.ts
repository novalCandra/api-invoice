import { Request, Response } from "express";
import { AllInvoiceData, deleteInvoiceServices, InvoiceDataDetails, postInvoiceServices, updateInvoiceServices } from "../services/invoice.service.js";
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
        console.log(error)
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
        console.log(error)
        return errorResponse(
            res
        )
    }
}


export const updateInvoiceController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);
        const clientId = Number(req.body?.clientId);
        const id = Number(req.params.id);
        const updateInvoice = await updateInvoiceServices(userId, clientId, id, req.body);
        return successResponse(res, updateInvoice, "Success Update Invoice")
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}


export const deleteInvoiceController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.params.id)
        await deleteInvoiceServices(invoiceId);
        return successResponse(res, "Success Delete Invoice")
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}