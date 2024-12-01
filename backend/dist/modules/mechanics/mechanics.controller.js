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
exports.MechanicsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const list_mechanic_query_dto_1 = require("./models/dto/req/list-mechanic-query.dto");
const mechanics_base_req_dto_1 = require("./models/dto/req/mechanics-base.req.dto");
const mechanics_update_req_dto_1 = require("./models/dto/req/mechanics-update.req.dto");
const mechanic_mapper_1 = require("./services/mechanic.mapper");
const mechanics_service_1 = require("./services/mechanics.service");
let MechanicsController = class MechanicsController {
    constructor(mechanicsService) {
        this.mechanicsService = mechanicsService;
    }
    async create(userData, dto) {
        const result = await this.mechanicsService.create(userData, dto);
        return mechanic_mapper_1.MechanicMapper.toResDto(result);
    }
    async update(userData, dto, mechanicId) {
        const result = await this.mechanicsService.update(userData, dto, mechanicId);
        return mechanic_mapper_1.MechanicMapper.toResDto(result);
    }
    async getAll(query) {
        const [entities, total] = await this.mechanicsService.getAll(query);
        return mechanic_mapper_1.MechanicMapper.toResDtoList(entities, total, query);
    }
    async getMyMechanic(userData, mechanicId) {
        const result = await this.mechanicsService.getMyMechanic(userData, mechanicId);
        return mechanic_mapper_1.MechanicMapper.toResDto(result);
    }
    async getById(mechanicId) {
        const result = await this.mechanicsService.getById(mechanicId);
        return mechanic_mapper_1.MechanicMapper.toResDto(result);
    }
    async deleteMyMechanic(userData, mechanicId) {
        await this.mechanicsService.deleteMyMechanic(userData, mechanicId);
    }
    async deleteById(mechanicId) {
        await this.mechanicsService.deleteById(mechanicId);
    }
};
exports.MechanicsController = MechanicsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create mechanic' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/mechanics-base.res.dto").MechanicsBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mechanics_base_req_dto_1.MechanicsBaseReqDto]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Patch)('/my-mechanic:mechanicId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update mechanic information' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/mechanics-base.res.dto").MechanicsBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('mechanicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mechanics_update_req_dto_1.MechanicsUpdateReqDto, String]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "update", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('all-mechanics'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all mechanics and search by name or showroom ID',
    }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/list-mechanics.res.dto").ListMechanicsResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_mechanic_query_dto_1.ListMechanicQueryDto]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Get)('/my-mechanic:mechanicId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my mechanic by ID' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/mechanics-base.res.dto").MechanicsBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('mechanicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "getMyMechanic", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(':mechanicId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mechanic by ID' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/mechanics-base.res.dto").MechanicsBaseResDto }),
    __param(0, (0, common_1.Param)('mechanicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Delete)('/my-mechanic:mechanicId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete my mechanic by ID' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('mechanicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "deleteMyMechanic", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Delete)(':mechanicId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete mechanic by ID' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('mechanicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MechanicsController.prototype, "deleteById", null);
exports.MechanicsController = MechanicsController = __decorate([
    (0, swagger_1.ApiTags)('mechanics'),
    (0, common_1.Controller)('mechanics'),
    __metadata("design:paramtypes", [mechanics_service_1.MechanicsService])
], MechanicsController);
//# sourceMappingURL=mechanics.controller.js.map