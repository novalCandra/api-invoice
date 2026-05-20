import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js";
import { Request, Response, NextFunction } from "express";
export const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const secreyKey = process.env.SECRET_KEY_JWT ?? "";
    if (!secreyKey) {
        return res.status(402).json({
            status: false,
            message: "JWT Not Secret key"
        })
    }
    if (!req?.headers.authorization?.startsWith("JWT ")) {
        return res.status(401).json({ status: false, message: "Unauthorized" })
    }

    try {
        if (req?.headers.authorization?.startsWith("JWT ")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secreyKey) as jwt.JwtPayload;
            const users = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
                select: {
                    id: true,
                    email: true,
                    nama: true,
                    role: true
                }
            })

            if (!users) {
                return res.status(403).json({
                    status: false,
                    message: "The Token is Invalid"
                })
            }
            req.users = {
                id: users.id,
                nama: users.nama,
                email: users.email,
                role: users.role
            }
            next();
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Serve Error"
        })
    }
}