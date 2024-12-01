"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const car_brand_repository_1 = require("./services/car-brand.repository");
const car_showroom_repository_1 = require("./services/car-showroom.repository");
const mechanic_repository_1 = require("./services/mechanic.repository");
const offer_repository_1 = require("./services/offer.repository");
const refresh_token_repository_1 = require("./services/refresh-token.repository");
const user_repository_1 = require("./services/user.repository");
const view_repository_1 = require("./services/view.repository");
const repositories = [
    user_repository_1.UserRepository,
    refresh_token_repository_1.RefreshTokenRepository,
    offer_repository_1.OfferRepository,
    mechanic_repository_1.MechanicRepository,
    car_showroom_repository_1.CarShowroomRepository,
    view_repository_1.ViewRepository,
    car_brand_repository_1.CarBrandRepository,
];
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [...repositories],
        exports: [...repositories],
    })
], RepositoryModule);
//# sourceMappingURL=repository.module.js.map