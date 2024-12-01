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
exports.StatisticController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const statistic_mapper_1 = require("./services/statistic.mapper");
const statistic_service_1 = require("./services/statistic.service");
let StatisticController = class StatisticController {
    constructor(statisticService) {
        this.statisticService = statisticService;
    }
    async getStatistic(userData, offerId) {
        const result = await this.statisticService.getStatistic(userData, offerId);
        return statistic_mapper_1.StatisticMapper.toResDto(result);
    }
};
exports.StatisticController = StatisticController;
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Get)(':offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get offer statistic' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/statistic-base.res.dto").StatisticBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getStatistic", null);
exports.StatisticController = StatisticController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('statistic'),
    (0, common_1.Controller)('statistic'),
    __metadata("design:paramtypes", [statistic_service_1.StatisticService])
], StatisticController);
//# sourceMappingURL=statistic.controller.js.map