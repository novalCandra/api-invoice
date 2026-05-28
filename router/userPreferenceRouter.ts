import express from "express";
import { VerifyToken } from "../middleware/verifyToken.js";
import { getAlluserPreferenceController, updatePreferenceController } from "../controller/userPreferenceController.js";
import { ValidateMiddleware } from "../middleware/ValidateMiddleware.js";
import { SchemaPreference } from "../utils/Schema.js";

const userPreferenceRouter = express.Router();
userPreferenceRouter.get("/preferences", VerifyToken, getAlluserPreferenceController)
userPreferenceRouter.put("/preferences/:id", ValidateMiddleware(SchemaPreference), VerifyToken, updatePreferenceController)
export default userPreferenceRouter;