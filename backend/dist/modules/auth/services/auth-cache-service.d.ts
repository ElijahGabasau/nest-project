import { ConfigService } from '@nestjs/config/dist/config.service';
import { Config } from '../../../configs/config.type';
import { RedisService } from '../../redis/services/redis.service';
export declare class AuthCacheService {
    private readonly redisService;
    private readonly configService;
    private jwtConfig;
    constructor(redisService: RedisService, configService: ConfigService<Config>);
    saveToken(token: string, userId: string): Promise<void>;
    isAccessTokenExist(userId: string, token: string): Promise<boolean>;
    deleteToken(userId: string): Promise<void>;
    private getKey;
}
