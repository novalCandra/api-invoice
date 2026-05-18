import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { getAllHistory } from "../controller/HistoryController.js";

const HistoryRouter = express.Router();
HistoryRouter.get("/history", VerifyToken, getAllHistory)
export default HistoryRouter;