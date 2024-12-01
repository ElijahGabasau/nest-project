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
exports.CarShowroomController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const car_showroom_base_req_dto_1 = require("./models/dto/req/car-showroom-base.req.dto");
const car_showroom_update_req_dto_1 = require("./models/dto/req/car-showroom-update.req.dto");
const list_car_showroom_query_dto_1 = require("./models/dto/req/list-car-showroom-query.dto");
const car_showroom_mapper_1 = require("./services/car-showroom.mapper");
const car_showroom_service_1 = require("./services/car-showroom.service");
let CarShowroomController = class CarShowroomController {
    constructor(carShowroomService) {
        this.carShowroomService = carShowroomService;
    }
    async create(userData, dto) {
        const result = await this.carShowroomService.create(userData, dto);
        return car_showroom_mapper_1.CarShowroomMapper.toResDto(result);
    }
    async updateMyShowroom(userData, dto) {
        const result = await this.carShowroomService.updateMyShowroom(userData, dto);
        return car_showroom_mapper_1.CarShowroomMapper.toResDto(result);
    }
    async deleteMyShowroom(userData) {
        await this.carShowroomService.deleteMyShowroom(userData);
    }
    async getMyShowroom(userData) {
        const result = await this.carShowroomService.getMyShowroom(userData);
        return car_showroom_mapper_1.CarShowroomMapper.toResDto(result);
    }
    async findAll(query) {
        const [entities, total] = await this.carShowroomService.findAll(query);
        return car_showroom_mapper_1.CarShowroomMapper.toResDtoList(entities, total, query);
    }
    async getShowroom(showroomId) {
        const result = await this.carShowroomService.getShowroom(showroomId);
        return car_showroom_mapper_1.CarShowroomMapper.toResDto(result);
    }
    async deleteShowroom(showroomId) {
        await this.carShowroomService.deleteShowroom(showroomId);
    }
};
exports.CarShowroomController = CarShowroomController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create showroom' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/car-showroom-base.res.dto").CarShowroomBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, car_showroom_base_req_dto_1.CarShowroomBaseReqDto]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Patch)('my-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Update my showroom' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/car-showroom-base.res.dto").CarShowroomBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, car_showroom_update_req_dto_1.CarShowroomUpdateReqDto]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "updateMyShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Delete)('my-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete my showroom' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "deleteMyShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN),
    (0, common_1.Get)('my-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my showroom' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/car-showroom-base.res.dto").CarShowroomBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "getMyShowroom", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all showrooms and search by name' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/list-car-showroom.res.dto").ListCarShowroomResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_car_showroom_query_dto_1.ListCarShowroomQueryDto]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':showroomId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get showroom by id' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/car-showroom-base.res.dto").CarShowroomBaseResDto }),
    __param(0, (0, common_1.Param)('showroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "getShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Delete)(':showroomId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete showroom by id' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('showroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarShowroomController.prototype, "deleteShowroom", null);
exports.CarShowroomController = CarShowroomController = __decorate([
    (0, swagger_1.ApiTags)('showroom'),
    (0, common_1.Controller)('showroom'),
    __metadata("design:paramtypes", [car_showroom_service_1.CarShowroomService])
], CarShowroomController);
//# sourceMappingURL=car-showroom.controller.js.map