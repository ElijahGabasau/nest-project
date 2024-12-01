"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const file_storage_module_1 = require("../file-storage/file-storage.module");
const mail_module_1 = require("../mail/mail.module");
const redis_module_1 = require("../redis/redis.module");
const offers_controller_1 = require("./offers.controller");
const currency_service_1 = require("./services/currency.service");
const offers_service_1 = require("./services/offers.service");
let OffersModule = class OffersModule {
};
exports.OffersModule = OffersModule;
exports.OffersModule = OffersModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_module_1.RedisModule, mail_module_1.MailModule, auth_module_1.AuthModule, file_storage_module_1.FileStorageModule],
        controllers: [offers_controller_1.OffersController],
        providers: [offers_service_1.OffersService, currency_service_1.CurrencyService],
        exports: [currency_service_1.CurrencyService],
    })
], OffersModule);
//# sourceMappingURL=offers.module.js.map