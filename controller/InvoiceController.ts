import { Request, Response } from "express";
import { AllInvoiceData, InvoiceDataDetails, postInvoiceServices } from "../services/invoice.service.js";
export const getAllInvoice = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id)
        const clientId = Number(req.client?.id)
        const InvoiceAll = await AllInvoiceData(userId, clientId);
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
        const detailInvoice = await InvoiceDataDetails(id)
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
        const createInvoice = await postInvoiceServices(userId, req.body)
        return res.status(201).json({
            status: true,
            message: "Success Create Invoice",
            data: createInvoice
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}