"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const role_enum_1 = require("../../../common/enums/role.enum");
const role_permissions_1 = require("../../accessControl/role-permissions");
const refresh_token_repository_1 = require("../../repository/services/refresh-token.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const user_mapper_1 = require("../../users/services/user.mapper");
const tokens_helper_1 = require("../helpers/tokens.helper");
const auth_cache_service_1 = require("./auth-cache-service");
const token_service_1 = require("./token-service");
let AuthService = class AuthService {
    constructor(userRepository, authCacheService, refreshTokenRepository, tokenService) {
        this.userRepository = userRepository;
        this.authCacheService = authCacheService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenService = tokenService;
    }
    async signUp(dto) {
        await this.isEmailExist(dto.email);
        const permissions = role_permissions_1.RolePermissions[role_enum_1.RoleEnum.USER];
        const password = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepository.save(this.userRepository.create({
            ...dto,
            password,
            permissions,
        }));
        const tokens = await tokens_helper_1.TokensHelper.generateAndSaveTokens(this.tokenService, this.authCacheService, this.refreshTokenRepository, user.id);
        return { user: user_mapper_1.UserMapper.toResDto(user), tokens };
    }
    async signIn(dto) {
        await this.isUserNotDeleted(dto.email);
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: ['id', 'password'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or user did not register');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Password is incorrect');
        }
        const tokens = await tokens_helper_1.TokensHelper.generateAndSaveTokens(this.tokenService, this.authCacheService, this.refreshTokenRepository, user.id);
        const userEntity = await this.userRepository.findOneBy({ id: user.id });
        return { user: user_mapper_1.UserMapper.toResDto(userEntity), tokens };
    }
    async signOut(userData) {
        await tokens_helper_1.TokensHelper.deleteTokens(this.authCacheService, this.refreshTokenRepository, userData.userId);
    }
    async refresh(userData) {
        await tokens_helper_1.TokensHelper.deleteTokens(this.authCacheService, this.refreshTokenRepository, userData.userId);
        const tokens = await tokens_helper_1.TokensHelper.generateAndSaveTokens(this.tokenService, this.authCacheService, this.refreshTokenRepository, userData.userId);
        return tokens;
    }
    async isEmailExist(email) {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            throw new common_1.ConflictException('Email already exist');
        }
    }
    async isUserNotDeleted(email) {
        const user = await this.userRepository.findOneBy({
            email,
            isActive: false,
        });
        if (user) {
            throw new common_1.ConflictException('Your account is deleted or banned');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        auth_cache_service_1.AuthCacheService,
        refresh_token_repository_1.RefreshTokenRepository,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map