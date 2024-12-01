"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferHelper = void 0;
const common_1 = require("@nestjs/common");
const status_enum_1 = require("../models/enums/status.enum");
const check_profanity_helper_1 = require("./check-profanity.helper");
const currency_converter_helper_1 = require("./currency-converter.helper");
let OfferHelper = class OfferHelper {
    static async checkAccessToOffer(offerRepository, offerId, userData) {
        const offer = await offerRepository.findOneBy({
            id: offerId,
            user_id: userData.userId,
        });
        if (!offer) {
            throw new common_1.ConflictException('Offer not found or not yours');
        }
        return offer;
    }
    static async checkUserStatus(userRepository, userId) {
        const user = await userRepository.findOneBy({
            id: userId,
            isActive: true,
        });
        if (!user) {
            throw new common_1.ConflictException('User is banned or deleted');
        }
        return user;
    }
    static async validateLocation(city, region) {
        if (!city && !region) {
            throw new common_1.ConflictException(' City or region must be filled');
        }
    }
    static async validateBrand(carBrandRepository, brandName, mailService) {
        const brand = await carBrandRepository.findOneBy({ brand: brandName });
        if (!brand) {
            await mailService.sendMessageAboutAddingCarBrand(brandName);
            throw new common_1.ConflictException('Brand not found and mail sent');
        }
        return brand;
    }
    static async getConvertedPrice(currencyService, currency, price) {
        const currencyRate = await currencyService.getCurrency(currency);
        const priceInUAH = await currency_converter_helper_1.CurrencyConverterHelper.convertInUAH(currency, price, currencyService);
        return { currencyRate, priceInUAH };
    }
    static async validateProfanity(text, offer, offerRepository) {
        const isBadWord = await check_profanity_helper_1.CheckProfanityHelper.checkProfanity(text);
        if (!isBadWord) {
            offer.status = status_enum_1.StatusEnum.ACTIVE;
            await offerRepository.save(offer);
        }
    }
    static async checkUserOfferForStatus(offerRepository, offerId) {
        const offer = await offerRepository.findOneBy({
            id: offerId,
            isSalon: false,
        });
        if (!offer) {
            throw new common_1.ConflictException('Offer not found or it is showroom offer');
        }
    }
    static async checkShowroomOfferForStatus(offerRepository, offerId) {
        const offer = await offerRepository.findOneBy({
            id: offerId,
            isSalon: true,
        });
        if (!offer) {
            throw new common_1.ConflictException('Offer not found or it is user offer');
        }
    }
};
exports.OfferHelper = OfferHelper;
exports.OfferHelper = OfferHelper = __decorate([
    (0, common_1.Injectable)()
], OfferHelper);
//# sourceMappingURL=offer.helper.js.map