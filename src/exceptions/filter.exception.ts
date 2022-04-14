import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { errorFormat } from "src/utils/helpers";

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        return response.send(errorFormat(error.message));
    }
}