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
exports.OffersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const api_file_decorator_1 = require("../../common/decorators/api-file.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const permissions_decorator_1 = require("../accessControl/decorators/permissions.decorator");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const permission_enum_1 = require("../accessControl/enums/permission.enum");
const permissions_guard_1 = require("../accessControl/permissions.guard");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const car_brand_req_dto_1 = require("./models/dto/req/car-brand.req.dto");
const list_offer_query_dto_1 = require("./models/dto/req/list-offer-query.dto");
const offer_base_req_dto_1 = require("./models/dto/req/offer-base.req.dto");
const update_offer_req_dto_1 = require("./models/dto/req/update-offer.req.dto");
const offer_mapper_1 = require("./services/offer.mapper");
const offers_service_1 = require("./services/offers.service");
let OffersController = class OffersController {
    constructor(offersService) {
        this.offersService = offersService;
    }
    async findAll(query) {
        const [entities, total] = await this.offersService.findAll(query);
        return offer_mapper_1.OfferMapper.toResDtoList(entities, total, query);
    }
    async createOffer(userData, dto) {
        const result = await this.offersService.createOffer(userData, dto);
        return offer_mapper_1.OfferMapper.toResDto(result);
    }
    async createOfferForShowroom(userData, dto) {
        const result = await this.offersService.createOfferForShowroom(userData, dto);
        return offer_mapper_1.OfferMapper.toResDto(result);
    }
    async uploadCarImage(userData, offerId, file) {
        const result = await this.offersService.uploadCarImage(userData, offerId, file);
        return offer_mapper_1.OfferMapper.toResDto(result);
    }
    async delereCarImage(userData, offerId) {
        await this.offersService.deleteCarImage(userData, offerId);
    }
    async updateMyOffer(userData, dto, offerId) {
        const result = await this.offersService.updateMyOffer(userData, dto, offerId);
        return offer_mapper_1.OfferMapper.toResDto(result);
    }
    async get(offerId) {
        const result = await this.offersService.getById(offerId);
        return offer_mapper_1.OfferMapper.toResDto(result);
    }
    async deleteMyOffer(userData, offerId) {
        await this.offersService.deleteMyOffer(userData, offerId);
    }
    async activateOfferUser(offerId) {
        await this.offersService.activateOfferUser(offerId);
    }
    async deactivateOfferUser(offerId) {
        await this.offersService.deactivateOfferUser(offerId);
    }
    async activateOfferShowroom(offerId) {
        await this.offersService.activateOfferShowroom(offerId);
    }
    async deactivateOfferShowroom(offerId) {
        await this.offersService.deactivateOfferShowroom(offerId);
    }
    async deleteByIdUserOffer(offerId) {
        await this.offersService.deleteByIdUserOffer(offerId);
    }
    async deleteByIdShowroomOffer(offerId) {
        await this.offersService.deleteByIdShowroomOffer(offerId);
    }
    async addCarBrand(dto) {
        const result = await this.offersService.addCarBrand(dto);
        return offer_mapper_1.OfferMapper.toResDtoBrand(result);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all offers and search by brand or model' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/list-offer.res.dto").ListOfferResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_offer_query_dto_1.ListOfferQueryDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Post)('user-offer'),
    (0, swagger_1.ApiOperation)({ summary: 'Create individual user offer' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/offer-base.res.dto").OfferBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, offer_base_req_dto_1.OfferBaseReqDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOffer", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Post)('showroom-offer'),
    (0, swagger_1.ApiOperation)({ summary: 'Create showroom offer' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/offer-base.res.dto").OfferBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, offer_base_req_dto_1.OfferBaseReqDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOfferForShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, api_file_decorator_1.ApiFile)('image', false, true),
    (0, common_1.Post)('/image/:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload car image' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/offer-base.res.dto").OfferBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('offerId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "uploadCarImage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Delete)('/image/:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete car image' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "delereCarImage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Patch)('my-offer:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update offer' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/offer-base.res.dto").OfferBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_offer_req_dto_1.UpdateOfferReqDto, String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "updateMyOffer", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(':offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get offer by id' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/offer-base.res.dto").OfferBaseResDto }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "get", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN, role_enum_1.RoleEnum.SHOWROOM_ADMIN, role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN),
    (0, common_1.Delete)('my-offer:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deleteMyOffer", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.ACTIVATE_OFFER_USER),
    (0, common_1.Patch)(':offerId/activate-offer'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate user offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "activateOfferUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_USER),
    (0, common_1.Patch)(':offerId/deactivate-offer'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate user offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deactivateOfferUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.ACTIVATE_OFFER_SHOWROOM),
    (0, common_1.Patch)(':offerId/activate-offer-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate showroom offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "activateOfferShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_SHOWROOM),
    (0, common_1.Patch)(':offerId/deactivate-offer-showroom'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate showroom offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deactivateOfferShowroom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DELETE_USER_OFFER),
    (0, common_1.Delete)('/delete-offer-user:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deleteByIdUserOffer", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)(permission_enum_1.PermissionEnum.DELETE_SHOWROOM_OFFER),
    (0, common_1.Delete)('/delete-offer-showroom:offerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete showroom offer' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('offerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "deleteByIdShowroomOffer", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Post)('add-car-brand'),
    (0, swagger_1.ApiOperation)({ summary: 'Add car brand' }),
    openapi.ApiResponse({ status: 201, type: require("./models/dto/res/car-brand.res.dto").CarBrandResDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_brand_req_dto_1.CarBrandReqDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "addCarBrand", null);
exports.OffersController = OffersController = __decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService])
], OffersController);
//# sourceMappingURL=offers.controller.js.map