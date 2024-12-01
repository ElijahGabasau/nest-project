"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const node_crypto_1 = require("node:crypto");
const path = __importStar(require("node:path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_service_1 = require("../../logger/services/logger.service");
let FileStorageService = class FileStorageService {
    constructor(logger, configService) {
        this.logger = logger;
        this.configService = configService;
        this.awsConfig = this.configService.get('aws');
        this.s3Client = new client_s3_1.S3Client({
            forcePathStyle: true,
            endpoint: this.awsConfig.endpoint,
            region: this.awsConfig.region,
            credentials: {
                accessKeyId: this.awsConfig.accessKey,
                secretAccessKey: this.awsConfig.secretKey,
            },
        });
    }
    async uploadFile(file, itemType, itemId) {
        if (!file) {
            this.logger.error('File is not provided');
            return;
        }
        try {
            const filePath = this.buildPath(itemType, itemId, file.originalname);
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.awsConfig.bucketName,
                Key: filePath,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            }));
            return filePath;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async deleteFile(filePath) {
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.awsConfig.bucketName,
                Key: filePath,
            }));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    buildPath(itemType, itemId, fileName) {
        return `${itemType}/${itemId}/${(0, node_crypto_1.randomUUID)()}${path.extname(fileName)}`;
    }
};
exports.FileStorageService = FileStorageService;
exports.FileStorageService = FileStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        config_1.ConfigService])
], FileStorageService);
//# sourceMappingURL=file-storage.service.js.map