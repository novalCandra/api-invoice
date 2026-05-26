import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { deletePatymentController, getPaymentController, postPaymentController, updatePaymentController } from "../controller/PaymentController.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { schemaPayment } from "../utils/Schema.js";

const PaymentRouter = express.Router();
PaymentRouter.get("/payments", VerifyToken, getPaymentController);
PaymentRouter.post("/payments", ValidateMiddleware(schemaPayment), VerifyToken, postPaymentController)
PaymentRouter.put("/payments/:id", ValidateMiddleware(schemaPayment), VerifyToken, updatePaymentController)
PaymentRouter.delete("/payments/:id", VerifyToken, deletePatymentController)
export default PaymentRouter;