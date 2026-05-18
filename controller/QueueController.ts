import prisma from "../config/prisma.js";
import { Request, Response } from "express";
export const allGetQueque = async (req: Request, res: Response) => {
    try {
        const allQueqe = await prisma.queue.findMany({
            where: {
                invoiceId: req.invoice?.id
            },
            include: {
                invoice: {
                    select: {
                        id: true, amount: true, clientNama: true, date: true, dueData: true,
                        histories: true, status: true, queue: true
                    }
                }
            }
        })
        if (!allQueqe) {
            return res.status(403).json({
                status: false,
                message: "Queue Not GET"
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Sucesss Create All Queqe",
                data: allQueqe
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error"
        })
    }
}