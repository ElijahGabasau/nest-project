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
exports.UsersAdminService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../../common/enums/role.enum");
const tokens_helper_1 = require("../../auth/helpers/tokens.helper");
const auth_cache_service_1 = require("../../auth/services/auth-cache-service");
const refresh_token_repository_1 = require("../../repository/services/refresh-token.repository");
const user_repository_1 = require("../../repository/services/user.repository");
let UsersAdminService = class UsersAdminService {
    constructor(userRepository, authCacheService, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.authCacheService = authCacheService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async findAll(query) {
        return await this.userRepository.findAll(query);
    }
    async findOne(userId) {
        return await this.userRepository.findOneBy({ id: userId });
    }
    async ban(userId) {
        const user = await this.userRepository.findOneBy({
            id: userId,
            role: role_enum_1.RoleEnum.USER || role_enum_1.RoleEnum.GUEST,
        });
        if (!user) {
            throw new common_1.ForbiddenException('You can only ban users');
        }
        await Promise.all([
            this.userRepository.update({ id: userId, role: role_enum_1.RoleEnum.USER }, { isActive: false }),
            tokens_helper_1.TokensHelper.deleteTokens(this.authCacheService, this.refreshTokenRepository, userId),
        ]);
    }
    async restoreUser(userId) {
        await this.userRepository.update({ id: userId, role: role_enum_1.RoleEnum.USER }, { isActive: true });
    }
};
exports.UsersAdminService = UsersAdminService;
exports.UsersAdminService = UsersAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        auth_cache_service_1.AuthCacheService,
        refresh_token_repository_1.RefreshTokenRepository])
], UsersAdminService);
//# sourceMappingURL=users-admin.service.js.map