import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

import { Config, JwtConfig } from '../../../configs/config.type';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(token: string, userId: string): Promise<void> {
    const key = this.getKey(userId);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }

  public async deleteToken(userId: string): Promise<void> {
    const key = this.getKey(userId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string): string {
    return `ACCESS_TOKEN:${userId}`;
  }
}
