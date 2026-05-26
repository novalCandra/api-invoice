import { BaseError } from "./base.error.js";

export class BadRequestError extends BaseError {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}