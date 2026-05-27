import express from 'express'
import { VerifyToken } from '../middleware/verifyToken.js';
import { getAllActivitas, getAllInvoiceAcivitas } from '../controller/LogAktivitasController.js';
const activititasRouter = express.Router();
activititasRouter.get("/aktivitas", VerifyToken, getAllActivitas)
activititasRouter.get("/invoice/:id/aktivitas", VerifyToken, getAllInvoiceAcivitas)
export default activititasRouter;