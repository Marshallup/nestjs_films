import { HttpException, HttpStatus } from "@nestjs/common";
import { validationFormFormat } from "src/utils/helpers";

export class ValidationException extends HttpException {
    constructor(response) {
        super(validationFormFormat(response), HttpStatus.BAD_REQUEST);
    }
}