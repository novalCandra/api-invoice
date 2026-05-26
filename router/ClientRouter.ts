import express from "express"
import { VerifyToken } from "../middleware/verifyToken.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { schemaClient } from "../utils/Schema.js";
import { createClientController, getAllClientController } from "../controller/ClienController.js";
const ClientRouter = express.Router();
ClientRouter.get("/client", VerifyToken, getAllClientController);
ClientRouter.post("/client", ValidateMiddleware(schemaClient), VerifyToken, createClientController);
export default ClientRouter;