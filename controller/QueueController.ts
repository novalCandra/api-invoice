import prisma from "../config/prisma.js";
import { Request, Response } from "express";
import { getAllQueueServices } from "../services/queue.service.js";
export const allGetQueque = async (req: Request, res: Response) => {
    try {
        const invoiceId = Number(req.invoice?.id)
        const allQueqe = await getAllQueueServices(invoiceId)
        return res.status(200).json({
            status: true,
            message: "Sucesss Create All Queqe",
            data: allQueqe
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error"
        })
    }
}