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
exports.UsersAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const roles_guard_1 = require("../accessControl/roles.guard");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const list_user_query_dto_1 = require("./models/dto/req/list-user-query.dto");
const user_mapper_1 = require("./services/user.mapper");
const users_admin_service_1 = require("./services/users-admin.service");
let UsersAdminController = class UsersAdminController {
    constructor(usersAdminService) {
        this.usersAdminService = usersAdminService;
    }
    async findAll(query) {
        const [entities, total] = await this.usersAdminService.findAll(query);
        return user_mapper_1.UserMapper.toResDtoList(entities, total, query);
    }
    async findOne(userId) {
        const result = await this.usersAdminService.findOne(userId);
        return user_mapper_1.UserMapper.toResDto(result);
    }
    async ban(userId) {
        await this.usersAdminService.ban(userId);
    }
    async restoreUser(userId) {
        await this.usersAdminService.restoreUser(userId);
    }
};
exports.UsersAdminController = UsersAdminController;
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'List of all users' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/list-user.res.dto").ListUserResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_user_query_dto_1.ListUserQueryDto]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Find user by id' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/user-base.res.dto").UserBaseResDto }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Patch)('ban:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Ban user' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "ban", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Patch)('restoreUser:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Unban user' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "restoreUser", null);
exports.UsersAdminController = UsersAdminController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('users-admin'),
    (0, common_1.Controller)('users-admin'),
    __metadata("design:paramtypes", [users_admin_service_1.UsersAdminService])
], UsersAdminController);
//# sourceMappingURL=users-admin.controller.js.map