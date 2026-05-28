import { errorResponse, successResponse } from "../helper/response.helper.js"
import { Request, Response } from "express"
import { deleteInvoiceItem, getDataInvoiceItemServices, postDataInvoiceItem, updateDataInvoice } from "../services/invoiceItem.service.js"
export const getAllInvoiceItemControllers = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const invoiceId = Number(req.params.id);
        const getInvoiceItem = await getDataInvoiceItemServices(userId, invoiceId);
        return successResponse(res, getInvoiceItem, "Success Get All Invoice items")
    } catch (error) {
        return errorResponse(res)
    }
}

export const postInvoiceItemController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const invoiceId = Number(req.params?.id)
        const createInvoiceItem = await postDataInvoiceItem(userId, invoiceId, req.body);
        return successResponse(res, createInvoiceItem, "Success Create Invoice")
    } catch (error) {
        return errorResponse(res);
    }
}

export const updateInvoiceItemController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.params?.id)
        const updateInvoiceItem = await updateDataInvoice(invoiceId, req.body);
        return successResponse(res, updateInvoiceItem, "Success Update Invoice Items")
    } catch (error) {
        return errorResponse(res)
    }
}

export const deleteInvoiceItemsController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.params?.id);
        await deleteInvoiceItem(invoiceId);
        return successResponse(res, "Success Delete Invoice")
    } catch (error) {
        return errorResponse(res)
    }
}