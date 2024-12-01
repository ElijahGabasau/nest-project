"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const redis_module_1 = require("../redis/redis.module");
const auth_controller_1 = require("./auth.controller");
const jwt_access_guard_1 = require("./guards/jwt-access.guard");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const auth_service_1 = require("./services/auth.service");
const auth_cache_service_1 = require("./services/auth-cache-service");
const token_service_1 = require("./services/token-service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_module_1.RedisModule, jwt_1.JwtModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_access_guard_1.JwtAccessGuard,
            },
            jwt_refresh_guard_1.JwtRefreshGuard,
            auth_service_1.AuthService,
            auth_cache_service_1.AuthCacheService,
            token_service_1.TokenService,
        ],
        exports: [auth_cache_service_1.AuthCacheService, token_service_1.TokenService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map