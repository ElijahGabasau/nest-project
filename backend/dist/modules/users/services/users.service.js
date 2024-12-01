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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../../common/enums/role.enum");
const tokens_helper_1 = require("../../auth/helpers/tokens.helper");
const auth_cache_service_1 = require("../../auth/services/auth-cache-service");
const refresh_token_repository_1 = require("../../repository/services/refresh-token.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const account_enum_1 = require("../models/enums/account.enum");
let UsersService = class UsersService {
    constructor(userRepository, refreshTokenRepository, authCacheService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authCacheService = authCacheService;
    }
    async becomeSeller(userData) {
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        user.role = role_enum_1.RoleEnum.USER;
        return await this.userRepository.save(user);
    }
    async me(userData) {
        return await this.userRepository.findOneBy({ id: userData.userId });
    }
    async updateMe(userData, dto) {
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        user.name = dto.name;
        user.phone = dto.phone;
        return await this.userRepository.save(user);
    }
    async deleteMe(userData) {
        await Promise.all([
            this.userRepository.update({ id: userData.userId }, { isActive: true }),
            tokens_helper_1.TokensHelper.deleteTokens(this.authCacheService, this.refreshTokenRepository, userData.userId),
        ]);
    }
    async updateAccount(userData) {
        await this.userRepository.update({ id: userData.userId }, { account: account_enum_1.AccountEnum.PREMIUM });
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        refresh_token_repository_1.RefreshTokenRepository,
        auth_cache_service_1.AuthCacheService])
], UsersService);
//# sourceMappingURL=users.service.js.map