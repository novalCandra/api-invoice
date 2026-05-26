import { Request, Response } from "express"
import { errorResponse, successResponse } from "../helper/response.helper.js"
import { InvoicecustomizationService, InvoiceCustomizationUpdateService } from "../services/invoiceCustomization.service.js";
export const getInvoicecustomizationController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.params.id);
        const getDataInvoiceCustomization = await InvoicecustomizationService(invoiceId);
        return successResponse(res, getDataInvoiceCustomization, "Success Data Invoice customization");
    } catch (error) {
        return errorResponse(res)
    }
}


export const updateInvoiceCustomazationController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updateInvoice = await InvoiceCustomizationUpdateService(id, req.body);
        return successResponse(res, updateInvoice, "Success Update Invoice Custom")
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}