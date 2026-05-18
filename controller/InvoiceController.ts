import prisma from "../config/prisma.js";
import { Request, Response } from "express";
export const getAllInvoice = async (req: Request, res: Response) => {
    try {
        const InvoiceAll = await prisma.invoice.findMany({
            where: {
                userId: req.users?.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nama: true,
                        email: true,
                        role: true
                    }
                }
            }
        });
        if (!InvoiceAll) {
            return res.status(403).json({
                status: false,
                message: "Not Invoice All"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Success All Invoice",
            data: InvoiceAll
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllInvoiceDetails = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const detailInvoice = await prisma.invoice.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nama: true,
                        email: true,
                        role: true
                    }
                }
            }
        })
        if (!detailInvoice) {
            return res.status(403).json({
                status: false,
                message: "Not Detail Invoice"
            })
        }
        return res.status(201).json({
            status: true,
            message: "Success Invoice Details",
            data: detailInvoice
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

export const postInvoice = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const { clientNama, status, amount, date, dueData } = req.body;
        const createInvoice = await prisma.invoice.create({
            data: {
                clientNama, status, amount, date: new Date(date), dueData: new Date(dueData), user: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nama: true
                    }
                }
            }
        })
        if (!createInvoice) {
            return res.status(403).json({
                status: false,
                message: "Not Create Invoice"
            })
        } else {
            return res.status(201).json({
                status: true,
                message: "Success Create Invoice",
                data: createInvoice
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}