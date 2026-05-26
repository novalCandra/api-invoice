import { BaseError } from "./base.error.js";

export class NotFoundError extends BaseError {
    constructor(message = "Data not found") {
        super(message, 404)
    }
}