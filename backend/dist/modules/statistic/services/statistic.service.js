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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../../offers/models/enums/status.enum");
const offer_repository_1 = require("../../repository/services/offer.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const view_repository_1 = require("../../repository/services/view.repository");
const account_enum_1 = require("../../users/models/enums/account.enum");
dayjs_1.default.extend(utc_1.default);
let StatisticService = class StatisticService {
    constructor(viewRepository, offerRepository, userRepository) {
        this.viewRepository = viewRepository;
        this.offerRepository = offerRepository;
        this.userRepository = userRepository;
    }
    async getStatistic(userData, offerId) {
        const now = (0, dayjs_1.default)();
        const startOfDay = now.startOf('day');
        const endOfDay = now.endOf('day');
        const week = now.subtract(1, 'week');
        const month = now.subtract(1, 'month');
        const user = await this.userRepository.findOneBy({
            id: userData.userId,
        });
        if (user.account !== account_enum_1.AccountEnum.PREMIUM) {
            throw new common_1.ForbiddenException('Only user with premium account can get statistic');
        }
        const offer = await this.offerRepository.findOne({
            where: { id: offerId },
        });
        if (offer.status !== status_enum_1.StatusEnum.ACTIVE) {
            throw new common_1.ForbiddenException('You can get statistic only for active offers');
        }
        const views = await this.viewRepository.count({
            where: { offer_id: offerId },
        });
        const viewsPerDay = await this.viewRepository.count({
            where: {
                offer_id: offerId,
                created: (0, typeorm_1.Between)(startOfDay.toDate(), endOfDay.toDate()),
            },
        });
        const viewsPerWeek = await this.viewRepository.count({
            where: {
                offer_id: offerId,
                created: (0, typeorm_1.Between)(week.toDate(), now.toDate()),
            },
        });
        const viewsPerMonth = await this.viewRepository.count({
            where: {
                offer_id: offerId,
                created: (0, typeorm_1.Between)(month.toDate(), now.toDate()),
            },
        });
        const averagePriceByUkraineInUAH = await this.offerRepository.average('priceInUAH', {
            brand: offer.brand,
        });
        const cityOrRegion = {
            brand: offer.brand,
        };
        if (offer.city) {
            cityOrRegion.city = offer.city;
        }
        else {
            cityOrRegion.region = offer.region;
        }
        const averagePriceByRegionInUAH = await this.offerRepository.average('priceInUAH', cityOrRegion);
        return {
            views,
            viewsPerDay,
            viewsPerWeek,
            viewsPerMonth,
            averagePriceByRegionInUAH,
            averagePriceByUkraineInUAH,
        };
    }
};
exports.StatisticService = StatisticService;
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [view_repository_1.ViewRepository,
        offer_repository_1.OfferRepository,
        user_repository_1.UserRepository])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map