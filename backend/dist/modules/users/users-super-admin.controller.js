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
exports.UsersSuperAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const permissions_decorator_1 = require("../accessControl/decorators/permissions.decorator");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const permission_enum_1 = require("../accessControl/enums/permission.enum");
const permissions_guard_1 = require("../accessControl/permissions.guard");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const user_admin_base_req_dto_1 = require("./models/dto/req/user-admin-base.req.dto");
const user_mapper_1 = require("./services/user.mapper");
const users_super_admin_service_1 = require("./services/users-super-admin.service");
let UsersSuperAdminController = class UsersSuperAdminController {
    constructor(usersSuperAdminService) {
        this.usersSuperAdminService = usersSuperAdminService;
    }
    async createSuperAdmin(dto) {
        const result = await this.usersSuperAdminService.createSuperAdmin(dto);
        return user_mapper_1.UserMapper.toAdminResDto(result);
    }
    async createSuperAdminShowroom(dto) {
        const result = await this.usersSuperAdminService.createSuperAdminShowroom(dto);
        return user_mapper_1.UserMapper.toAdminResDto(result);
    }
    async createAdmin(userData, dto) {
        const result = await this.usersSuperAdminService.createAdmin(dto);
        return user_mapper_1.UserMapper.toAdminResDto(result);
    }
    async createAdminShowroom(userData, dto) {
        const result = await this.usersSuperAdminService.createAdminShowroom(dto);
        return user_mapper_1.UserMapper.toAdminResDto(result);
    }
    async deleteOne(userId) {
        await this.usersSuperAdminService.deleteOne(userId);
    }
    async deleteOneS(userId) {
        await this.usersSuperAdminService.deleteOneS(userId);
    }
    async findByRole(role) {
        const result = await this.usersSuperAdminService.findByRole(role);
        return result.map((user) => user_mapper_1.UserMapper.toResDto(user));
    }
};
exports.UsersSuperAdminController = UsersSuperAdminController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('create-super-admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new super admin' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/user-admin.res.dto").UserAdminResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_admin_base_req_dto_1.UserAdminBaseReqDto]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "createSuperAdmin", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Post)('create-super-admin-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new super admin for showrooms' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/user-admin.res.dto").UserAdminResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_admin_base_req_dto_1.UserAdminBaseReqDto]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "createSuperAdminShowroom", null);
__decorate([
    (0, common_1.Post)('create-admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new admin' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.CREATE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/user-admin.res.dto").UserAdminResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_admin_base_req_dto_1.UserAdminBaseReqDto]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('create-admin-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new admin for showroom' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.CREATE_SHOWROOM_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/user-admin.res.dto").UserAdminResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_admin_base_req_dto_1.UserAdminBaseReqDto]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "createAdminShowroom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DELETE_BY_ID_SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/delete/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete admin or user' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DELETE_BY_ID_SHOWROOM_SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/delete-showroom/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete admin for showroom' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "deleteOneS", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':role'),
    (0, swagger_1.ApiOperation)({ summary: 'Find all by role' }),
    openapi.ApiResponse({ status: 200, type: [require("./models/dto/res/user-base.res.dto").UserBaseResDto] }),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersSuperAdminController.prototype, "findByRole", null);
exports.UsersSuperAdminController = UsersSuperAdminController = __decorate([
    (0, swagger_1.ApiTags)('users-super-admin'),
    (0, common_1.Controller)('users-super-admin'),
    __metadata("design:paramtypes", [users_super_admin_service_1.UsersSuperAdminService])
], UsersSuperAdminController);
//# sourceMappingURL=users-super-admin.controller.js.map