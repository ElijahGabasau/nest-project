"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../redis/services/redis.service");
let CurrencyService = class CurrencyService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async saveCurrency(currency, amount) {
        const key = this.getKey(currency);
        await this.redisService.deleteByKey(key);
        await this.redisService.addOneToSet(key, amount.toString());
    }
    async getCurrency(currency) {
        const key = this.getKey(currency);
        const set = await this.redisService.sMembers(key);
        return parseFloat(set[0]);
    }
    getKey(currency) {
        return `CURRENCY:${currency}`;
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map