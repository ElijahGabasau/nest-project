import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from '../../modules/logger/services/logger.service';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: any, host: ArgumentsHost): void;
}
