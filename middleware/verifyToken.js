import jwt from "jsonwebtoken"
import prisma from "../config/prisma";
export const VerifyToken = async (req, res, next) => {
    const secreyKey = process.env.SECRET_KEY_JWT;
    if (!secreyKey) {
        res.status(402).json({
            status: false,
            message: "JWT Not Secret key"
        })
    }
    if (req?.headers.authorization?.startsWith("JWT ")) {
        return res.status(401).json({ status: false, message: "Unauthorized" })
    }

    try {
        if (req?.headers.authorization?.startsWith("JWT ")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secreyKey);
            const users = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                }
            })

            if (!user) {
                return res.status(403).json({
                    status: false,
                    message: "The Token is Invalid"
                })
            }
            req.users = {
                id: users.id.toString(),
                name: users.name,
                email: users.email,
                role: users.role
            }
            req.users = decoded();
            next();
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Serve Error"
        })
    }
}