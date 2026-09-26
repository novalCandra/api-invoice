import { errorResponse, successResponse } from "../helper/response.helper.js";
import { conversationService } from "../services/conversation.service.js";
export const conversationControllerGet = async (req, res) => {
    try {
        const userId = Number(req.users?.id);
        const getDataconversations = await conversationService(userId);
        return successResponse(res, getDataconversations, "Success GET ALL Conversations");
    }
    catch (error) {
        console.log(error);
        return errorResponse(res);
    }
};
