import { errorResponse, successResponse } from "../helper/response.helper.js";
import { getAllInvoiceAktivitas, getAllLogAktivitasServices } from "../services/logAktivitas.service.js";
export const getAllActivitas = async (req, res) => {
    try {
        const userId = Number(req.users?.id);
        const invoiceId = Number(req.invoice?.id);
        const getActivitas = await getAllLogAktivitasServices(userId, invoiceId);
        return successResponse(res, getActivitas, "Success All get Activitas");
    }
    catch (error) {
        return errorResponse(res);
    }
};
export const getAllInvoiceAcivitas = async (req, res) => {
    try {
        const InvoiceId = Number(req.body?.invoiceId);
        const getAllAktivitasInvoice = await getAllInvoiceAktivitas(InvoiceId);
        return successResponse(res, getAllAktivitasInvoice, "Sucess Get All Activitas Invoice");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res);
    }
};
