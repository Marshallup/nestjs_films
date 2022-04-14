import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const obj = plainToClass(metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const messages  = Object.fromEntries(
                errors.map(err => [err.property, Object.values(err.constraints)])
            )
            throw new ValidationException(messages)
        }
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
      }
}