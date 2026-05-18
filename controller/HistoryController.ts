import prisma from "../config/prisma.js";
import { Request, Response } from "express";
export const getAllHistory = async (req: Request, res: Response) => {
    try {
        const dataHistory = await prisma.history.findMany({
            where: {
                userId: req.users?.id,
                invoiceId: req.invoice?.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nama: true,
                        email: true,
                        role: true
                    }
                },
                invoices: {
                    select: {
                        id: true, amount: true, clientNama: true, date: true, dueData: true,
                        histories: true, status: true, queue: true
                    }
                }
            }
        })
        if (!dataHistory) {
            return res.status(403).json({
                status: false,
                message: "not Gte History"
            }
            )
        } else {
            return res.status(200).json({
                status: true,
                message: "Success GET",
                data: dataHistory
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}