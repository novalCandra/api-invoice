
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../config/prisma";
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginUsers = await prisma.user.findUnique({
            where: { email }
        })
        if (!loginUsers) {
            return res.status(402).json({
                status: false,
                message: "Email and Password not Database"
            })
        }

        const invalidasi = await bcrypt.compare(password, loginUsers.password);
        if (!invalidasi) {
            return res.status(403).json({
                status: false,
                message: "Wrong Password"
            })
        }

        const { password: _, ...safeUsers } = loginUsers;

        const token = jwt.sign(
            { id: loginUsers.id, email: loginUsers.email },
            process.env.SECRET_KEY_JWT,
            { expiresIn: "1d" }
        )

        return res.status(201).json({
            status: true,
            message: "Sucess Login",
            data: safeUsers,
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const RegisterController = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const createAccount = await prisma.user.create({
            data: {
                nama: nama, email: email, password: hashPassword, role: "user"
            }
        })

        if (!createAccount) {
            return res.status(403).json({
                status: false,
                message: "False Create Register"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Success Create Account",
            data: createAccount
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}