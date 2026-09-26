export class BaseError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = this.message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
