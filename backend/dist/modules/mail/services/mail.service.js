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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const role_enum_1 = require("../../../common/enums/role.enum");
const user_repository_1 = require("../../repository/services/user.repository");
let MailService = class MailService {
    constructor(mailerService, userRepository) {
        this.mailerService = mailerService;
        this.userRepository = userRepository;
    }
    async sendMessageAboutAddingCarBrand(brand) {
        const url = `http://localhost:3000/docs#/offers/OffersController_addCarBrand`;
        const admins = await this.userRepository.findBy({ role: role_enum_1.RoleEnum.ADMIN });
        const adminsEmails = admins.map((admin) => admin.email);
        await this.mailerService.sendMail({
            to: 'varenaska@gmail.com',
            subject: 'Car brand is missing. Please add it.',
            template: 'car-brand',
            context: {
                brand,
                url,
            },
        });
    }
    async sendMessageAboutCheckingPost(offerId) {
        const url = `http://localhost:3000/docs#/offers/OffersController_get`;
        const admins = await this.userRepository.findBy({ role: role_enum_1.RoleEnum.ADMIN });
        const adminsEmails = admins.map((admin) => admin.email);
        await this.mailerService.sendMail({
            to: 'varenaska@gmail.com',
            subject: 'Offer is waiting for checking',
            template: 'check-user-offer',
            context: {
                offerId,
                url,
            },
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        user_repository_1.UserRepository])
], MailService);
//# sourceMappingURL=mail.service.js.map