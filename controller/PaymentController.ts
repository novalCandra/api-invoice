import { errorResponse, successResponse } from "../helper/response.helper.js"
import { Request, Response } from "express"
import { createPaymentService, deletePaymentService, getPaymentAllService, updatePaymentService } from "../services/payment.service.js";
export const getPaymentController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);

        const getAllPayment = await getPaymentAllService(userId);
        return successResponse(res, getAllPayment, "Success All Payments")
    } catch (error) {
        return errorResponse(res)
    }
}

export const postPaymentController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);
        const invoiceId = Number(req.body.invoiceId);
        const createPaymentControler = await createPaymentService(userId, invoiceId, req.body);
        return successResponse(res, createPaymentControler, "Success Create Payments");
    } catch (error) {
        return errorResponse(res)
    }
}

export const updatePaymentController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);
        const invoiceId = Number(req.body.invoiceId);
        const id = Number(req.params.id)
        console.log({ userId, invoiceId });
        const updatePayments = await updatePaymentService(userId, invoiceId, id, req.body);
        return successResponse(res, updatePayments, "Success Update Payments")
    } catch (error) {
        return errorResponse(res)
    }
}

export const deletePatymentController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await deletePaymentService(id);
        return successResponse(res, "Success Delete Payments")
    } catch (error) {
        return errorResponse(res)
    }
}