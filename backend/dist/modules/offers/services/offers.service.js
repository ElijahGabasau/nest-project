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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const content_type_enum_1 = require("../../file-storage/enums/content-type.enum");
const file_storage_service_1 = require("../../file-storage/services/file-storage.service");
const mail_service_1 = require("../../mail/services/mail.service");
const car_brand_repository_1 = require("../../repository/services/car-brand.repository");
const car_showroom_repository_1 = require("../../repository/services/car-showroom.repository");
const offer_repository_1 = require("../../repository/services/offer.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const view_repository_1 = require("../../repository/services/view.repository");
const account_enum_1 = require("../../users/models/enums/account.enum");
const check_profanity_helper_1 = require("../helpers/check-profanity.helper");
const currency_converter_helper_1 = require("../helpers/currency-converter.helper");
const offer_helper_1 = require("../helpers/offer.helper");
const status_enum_1 = require("../models/enums/status.enum");
const currency_service_1 = require("./currency.service");
let OffersService = class OffersService {
    constructor(offerRepository, currencyService, userRepository, viewRepository, carBrandRepository, mailService, carShowroomRepository, fileStorageService, configService) {
        this.offerRepository = offerRepository;
        this.currencyService = currencyService;
        this.userRepository = userRepository;
        this.viewRepository = viewRepository;
        this.carBrandRepository = carBrandRepository;
        this.mailService = mailService;
        this.carShowroomRepository = carShowroomRepository;
        this.fileStorageService = fileStorageService;
        this.configService = configService;
    }
    async findAll(query) {
        return await this.offerRepository.findAll(query);
    }
    async createOffer(userData, dto) {
        const user = await offer_helper_1.OfferHelper.checkUserStatus(this.userRepository, userData.userId);
        if (user.account === account_enum_1.AccountEnum.BASIC) {
            const offerCount = await this.offerRepository.count({
                where: { user_id: user.id },
            });
            if (offerCount >= 1) {
                throw new common_1.ForbiddenException('Basic account users can create only one offer.If you want to create more, please upgrade your account');
            }
        }
        const brand = await offer_helper_1.OfferHelper.validateBrand(this.carBrandRepository, dto.brand, this.mailService);
        const { currencyRate, priceInUAH } = await offer_helper_1.OfferHelper.getConvertedPrice(this.currencyService, dto.currency, dto.price);
        await offer_helper_1.OfferHelper.validateLocation(dto.city, dto.region);
        const offer = await this.offerRepository.save(this.offerRepository.create({
            ...dto,
            brand: brand.brand,
            currencyRate,
            priceInUAH,
            user_id: userData.userId,
        }));
        await offer_helper_1.OfferHelper.validateProfanity(`${dto.title} ${dto.description}`, offer, this.offerRepository);
        return offer;
    }
    async createOfferForShowroom(userData, dto) {
        const user = await offer_helper_1.OfferHelper.checkUserStatus(this.userRepository, userData.userId);
        const doUserHasShowroom = await this.userRepository.findOneBy({
            id: user.id,
            isHaveSalon: true,
        });
        if (!doUserHasShowroom) {
            throw new common_1.ConflictException('User has no showroom');
        }
        const showroom = await this.carShowroomRepository.findOneBy({
            user_id: userData.userId,
        });
        const brand = await offer_helper_1.OfferHelper.validateBrand(this.carBrandRepository, dto.brand, this.mailService);
        const { currencyRate, priceInUAH } = await offer_helper_1.OfferHelper.getConvertedPrice(this.currencyService, dto.currency, dto.price);
        await offer_helper_1.OfferHelper.validateLocation(dto.city, dto.region);
        const offer = await this.offerRepository.save(this.offerRepository.create({
            ...dto,
            currencyRate: currencyRate,
            priceInUAH: priceInUAH,
            user_id: userData.userId,
            isSalon: true,
            carShowroom_id: showroom.id,
            brand: brand.brand,
        }));
        await offer_helper_1.OfferHelper.validateProfanity(`${dto.title} ${dto.description}`, offer, this.offerRepository);
        return offer;
    }
    async uploadCarImage(userData, offerId, file) {
        const offer = await offer_helper_1.OfferHelper.checkAccessToOffer(this.offerRepository, offerId, userData);
        const pathToFile = await this.fileStorageService.uploadFile(file, content_type_enum_1.ContentType.IMAGE, offerId);
        if (offer.image) {
            await this.fileStorageService.deleteFile(offer.image);
        }
        const awsConfig = this.configService.get('aws');
        const imageURL = `${awsConfig.endpoint}/${awsConfig.bucketName}/${pathToFile}`;
        const updatedOffer = await this.offerRepository.save({
            ...offer,
            image: imageURL,
        });
        return updatedOffer;
    }
    async deleteCarImage(userData, offerId) {
        const offer = await offer_helper_1.OfferHelper.checkAccessToOffer(this.offerRepository, offerId, userData);
        const key = this.extractKeyFromUrl(offer.image);
        if (offer.image) {
            await this.fileStorageService.deleteFile(key);
            await this.offerRepository.save({ ...offer, image: null });
        }
    }
    extractKeyFromUrl(url) {
        const awsConfig = this.configService.get('aws');
        const bucketUrl = `${awsConfig.endpoint}/${awsConfig.bucketName}/`;
        return url.replace(bucketUrl, '');
    }
    async updateMyOffer(userData, dto, offerId) {
        const offer = await offer_helper_1.OfferHelper.checkAccessToOffer(this.offerRepository, offerId, userData);
        const currencyRate = await this.currencyService.getCurrency(dto.currency);
        const priceInUAH = await currency_converter_helper_1.CurrencyConverterHelper.convertInUAH(dto.currency, dto.price, this.currencyService);
        await offer_helper_1.OfferHelper.validateLocation(dto.city, dto.region);
        const isBadWord = await check_profanity_helper_1.CheckProfanityHelper.checkProfanity(`${dto.title} ${dto.description}`);
        if (isBadWord && offer.status === status_enum_1.StatusEnum.ACTIVE) {
            offer.status = status_enum_1.StatusEnum.PENDING;
            offer.attempts = 0;
        }
        if (!isBadWord && offer.status === status_enum_1.StatusEnum.PENDING) {
            offer.status = status_enum_1.StatusEnum.ACTIVE;
        }
        if (isBadWord && offer.status === status_enum_1.StatusEnum.PENDING) {
            offer.attempts += 1;
        }
        if (offer.attempts >= 3) {
            offer.status = status_enum_1.StatusEnum.INACTIVE;
            await this.mailService.sendMessageAboutCheckingPost(offerId.toString());
        }
        return await this.offerRepository.save({
            ...offer,
            ...dto,
            currencyRate,
            priceInUAH,
        });
    }
    async getById(offerId) {
        const offer = await this.offerRepository.findOneBy({ id: offerId });
        if (!offer) {
            throw new common_1.ConflictException('Offer not found');
        }
        await this.viewRepository.save(this.viewRepository.create({ offer_id: offerId }));
        return offer;
    }
    async deleteMyOffer(userData, offerId) {
        await offer_helper_1.OfferHelper.checkAccessToOffer(this.offerRepository, offerId, userData);
        await this.offerRepository.delete({ id: offerId });
    }
    async activateOfferUser(offerId) {
        await offer_helper_1.OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.update({ id: offerId }, { status: status_enum_1.StatusEnum.ACTIVE });
    }
    async deactivateOfferUser(offerId) {
        await offer_helper_1.OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.update({ id: offerId }, { status: status_enum_1.StatusEnum.INACTIVE });
    }
    async activateOfferShowroom(offerId) {
        await offer_helper_1.OfferHelper.checkShowroomOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.update({ id: offerId }, { status: status_enum_1.StatusEnum.ACTIVE });
    }
    async deactivateOfferShowroom(offerId) {
        await offer_helper_1.OfferHelper.checkShowroomOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.update({ id: offerId }, { status: status_enum_1.StatusEnum.INACTIVE });
    }
    async deleteByIdUserOffer(offerId) {
        await offer_helper_1.OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.delete({ id: offerId });
    }
    async deleteByIdShowroomOffer(offerId) {
        await offer_helper_1.OfferHelper.checkShowroomOfferForStatus(this.offerRepository, offerId);
        await this.offerRepository.delete({ id: offerId });
    }
    async addCarBrand(dto) {
        const brand = await this.carBrandRepository.findOneBy({ brand: dto.brand });
        if (brand) {
            throw new common_1.ConflictException('Brand already exists');
        }
        return await this.carBrandRepository.save(this.carBrandRepository.create({
            ...dto,
        }));
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [offer_repository_1.OfferRepository,
        currency_service_1.CurrencyService,
        user_repository_1.UserRepository,
        view_repository_1.ViewRepository,
        car_brand_repository_1.CarBrandRepository,
        mail_service_1.MailService,
        car_showroom_repository_1.CarShowroomRepository,
        file_storage_service_1.FileStorageService,
        config_1.ConfigService])
], OffersService);
//# sourceMappingURL=offers.service.js.map