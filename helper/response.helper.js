export const errorResponse = (res, message = "Internal Server error", status = 500) => {
    return res.status(status).json({
        status: false,
        message
    });
};
export const successResponse = (res, data, message = "Success", status = 200) => {
    return res.status(status).json({
        status: true,
        data,
        message
    });
};
