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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const skip_auth_decorator_1 = require("./decorators/skip-auth.decorator");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const sign_in_req_dto_1 = require("./models/dto/req/sign-in.req.dto");
const sign_up_req_dto_1 = require("./models/dto/req/sign-up.req.dto");
const auth_service_1 = require("./services/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(dto) {
        return await this.authService.signUp(dto);
    }
    async signIn(dto) {
        return await this.authService.signIn(dto);
    }
    async signOut(userData) {
        return await this.authService.signOut(userData);
    }
    async refresh(userData) {
        return await this.authService.refresh(userData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('sigh-up'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/auth.res.dto").AuthResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_req_dto_1.SignUpReqDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('sign-in'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/auth.res.dto").AuthResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_req_dto_1.SignInReqDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-out'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/token-pair.res.dto").TokenPairResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map