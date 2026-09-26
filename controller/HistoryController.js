import { getAllServicesHistory } from "../services/history.service.js";
export const getAllHistory = async (req, res) => {
    try {
        const userId = req.users?.id ? Number(req.users.id) : undefined;
        const invoiceId = req.invoice?.id ? Number(req.invoice.id) : undefined;
        console.log({ userId, invoiceId });
        const dataHistory = await getAllServicesHistory(userId, invoiceId);
        return res.status(200).json({
            status: true,
            message: "Success GET",
            data: dataHistory
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
            stack: error.stack
        });
    }
};
