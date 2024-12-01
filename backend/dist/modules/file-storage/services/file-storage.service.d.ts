import { ConfigService } from '@nestjs/config';
import { Config } from '../../../configs/config.type';
import { LoggerService } from '../../logger/services/logger.service';
import { ContentType } from '../enums/content-type.enum';
export declare class FileStorageService {
    private readonly logger;
    private readonly configService;
    private readonly awsConfig;
    private readonly s3Client;
    constructor(logger: LoggerService, configService: ConfigService<Config>);
    uploadFile(file: Express.Multer.File, itemType: ContentType, itemId: string): Promise<string | undefined>;
    deleteFile(filePath: string): Promise<void>;
    private buildPath;
}
