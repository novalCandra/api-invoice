import { Response } from "express";

export const errorResponse = (
    res: Response,
    message: string = "Internal Server error",
    status: number = 500
) => {
    return res.status(status).json({
        status: false,
        message
    })
}

export const successResponse = (
    res: Response,
    data: unknown,
    message: string = "Success",
    status: number = 200
) => {
    return res.status(status).json({
        status: true,
        data,
        message
    })
}