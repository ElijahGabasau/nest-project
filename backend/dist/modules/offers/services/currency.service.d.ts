import { RedisService } from '../../redis/services/redis.service';
import { CurrencyEnum } from '../models/enums/currency.enum';
export declare class CurrencyService {
    private readonly redisService;
    constructor(redisService: RedisService);
    saveCurrency(currency: CurrencyEnum, amount: number): Promise<void>;
    getCurrency(currency: CurrencyEnum): Promise<number>;
    private getKey;
}
