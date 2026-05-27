import prisma from "../config/prisma.js"

export const conversationService = async (userId: number) => {
    const getDataconversation = await prisma.conversations.findMany({
        where: {
            userId
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
    if (!getDataconversation) {
        const error = new Error("failed data conversations");
        throw error
    }
    return getDataconversation;
}