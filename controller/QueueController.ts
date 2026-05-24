import { Request, Response } from "express";
import { getAllQueueServices } from "../services/queue.service.js";
export const allGetQueque = async (req: Request, res: Response) => {
    try {
        const invoiceId = req.invoice?.id ? Number(req.invoice.id) : undefined;
        const allQueqe = await getAllQueueServices(invoiceId)
        return res.status(200).json({
            status: true,
            message: "Sucesss Data All Queqe",
            data: allQueqe
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server error"
        })
    }
}