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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = __importDefault(require("axios"));
const currency_service_1 = require("../offers/services/currency.service");
const offer_repository_1 = require("../repository/services/offer.repository");
let TasksService = TasksService_1 = class TasksService {
    constructor(currencyService, offerRepository) {
        this.currencyService = currencyService;
        this.offerRepository = offerRepository;
        this.logger = new common_1.Logger(TasksService_1.name);
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
        });
        this.getCurrency = async () => {
            try {
                const { data } = await this.axiosInstance.get(this.axiosInstance.defaults.baseURL);
                for (const item of data) {
                    await this.currencyService.saveCurrency(item.ccy, item.sale);
                }
            }
            catch (error) {
                this.logger.error(error);
            }
        };
        this.updateCurrency = async () => {
            try {
                const offers = await this.offerRepository.find();
                for (const offer of offers) {
                    const currency = await this.currencyService.getCurrency(offer.currency);
                    const newPrice = offer.price * currency;
                    await this.offerRepository.update(offer.id, {
                        priceInUAH: newPrice,
                        currencyRate: currency,
                    });
                }
            }
            catch (error) {
                this.logger.error(error);
            }
        };
    }
    handleCron() {
        console.log('here is cron check');
        this.getCurrency();
        this.updateCurrency();
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksService.prototype, "handleCron", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService,
        offer_repository_1.OfferRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map