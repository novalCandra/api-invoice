import prisma from "../config/prisma.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { typeLogin, typeRegister } from "../types/Type.js"
export const AuthServicesLogin = async ({ email, password }: typeLogin) => {
    const loginServices = await prisma.user.findUnique({
        where: { email }
    })
    if (!loginServices) {
        const error = new Error("Email not database");
        throw error
    }

    const inVaalid = await bcrypt.compare(password, loginServices?.password);

    if (!inVaalid) {
        const error = new Error("Password not database");
        throw error
    }

    const { password: _, ...safeUsers } = loginServices

    const token = jwt.sign(
        { id: loginServices.id, email: loginServices.email },
        process.env.SECRET_KEY_JWT!,
        { expiresIn: "1d" }
    )

    return { loginServices: safeUsers, token }
}

export const AuthServicesRegister = async ({ nama, email, password, role }: typeRegister) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const createAccount = await prisma.user.create({
        data: {
            nama: nama, email: email, password: hashPassword, role: "user"
        }
    })
    const { password: _, ...safeUsers } = createAccount;
    if (!createAccount) {
        const error = new Error("Not Create Accoutn");
        throw error;
    }

    return { createAccount: safeUsers };
}