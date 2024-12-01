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
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("node:process"));
exports.default = () => ({
    app: {
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        host: process.env.APP_HOST,
    },
    mail: {
        email: process.env.SMTP_EMAIL,
        password: process.env.SMTP_PASSWORD,
    },
    database: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        name: process.env.POSTGRES_DB,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
    },
    aws: {
        accessKey: process.env.AWS_ACCESS_KEY,
        secretKey: process.env.AWS_SECRET_KEY,
        bucketName: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_S3_REGION,
        ACL: process.env.AWS_S3_ACL,
        endpoint: process.env.AWS_S3_ENDPOINT,
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        accessExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10) || 3600,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10) || 86400,
    },
});
//# sourceMappingURL=configuration.js.map