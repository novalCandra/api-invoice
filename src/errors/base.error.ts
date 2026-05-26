export class BaseError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message)
        this.message = this.message;
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}