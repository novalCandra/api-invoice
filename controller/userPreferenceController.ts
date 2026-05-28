import { errorResponse, successResponse } from "../helper/response.helper.js"
import { Request, Response } from "express"
import { userPreferenceServices, userPrefrenceServiceUpdate } from "../services/userPreference.service.js";
export const getAlluserPreferenceController = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.users?.id);
        const getDataPreference = await userPreferenceServices(userId);

        return successResponse(res, getDataPreference, "Success All User Prefenrence")
    } catch (error) {
        return errorResponse(res)
    }
}

export const updatePreferenceController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updateDataPreference = await userPrefrenceServiceUpdate(id, req.body);
        return successResponse(res, updateDataPreference, "Success Update User preferece");
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}