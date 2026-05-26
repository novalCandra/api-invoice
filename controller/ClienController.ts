import { errorResponse, successResponse } from "../helper/response.helper.js"
import { Request, Response } from "express"
import { createServiceClient, getAllServiceClient } from "../services/Client.service.js"
export const getAllClientController = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.invoice?.id)
        const getData = await getAllServiceClient(invoiceId);
        return successResponse(res, getData, "Success GET cLIENT");
    } catch (error) {
        return errorResponse(res)
    }
}

export const createClientController = async (req: Request, res: Response) => {
    try {
        const createPrisma = await createServiceClient(req.body)
        return successResponse(res, createPrisma, "success Create Prisma")
    } catch (error) {
        return errorResponse(res)
    }
}