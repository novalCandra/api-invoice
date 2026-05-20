import { Request, Response } from "express";
import { getAllServicesHistory } from "../services/history.service.js";
export const getAllHistory = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);
        const invoiceId = Number(req.invoice?.id)
        const dataHistory = await getAllServicesHistory(userId, invoiceId)
        return res.status(200).json({
            status: true,
            message: "Success GET",
            data: dataHistory
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}