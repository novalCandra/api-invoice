import { ZodError } from "zod";

export const ValidateMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessage = error.issues.map((err) => err.message)
            return res.status(500).json({
                error: "Invalid Request",
                detail: errorMessage
            })
        }

        res.status(500).json({ status: false, message: "Internal Server erro" })
    }
}