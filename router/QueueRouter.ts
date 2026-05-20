import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { allGetQueque } from "../controller/QueueController.js";

const QueueRouter = express.Router();
QueueRouter.get("/queue", VerifyToken, allGetQueque)
export default QueueRouter;