import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { conversationControllerGet } from "../controller/conversationController.js";

const conversationRouter = express.Router();
conversationRouter.get("/conversations", VerifyToken, conversationControllerGet)
export default conversationRouter;