import express from "express"
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { SchameLogin, SchemaRegister } from "../utils/Schema.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import { RegisterController, LoginController } from "../controller/AuthController.js";
const AuthRouter = express.Router();
AuthRouter.post("/login", ValidateMiddleware(SchameLogin), LoginController)
AuthRouter.post("/register", ValidateMiddleware(SchemaRegister), RegisterController)
export default AuthRouter