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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_decorator_1 = require("../accessControl/decorators/roles.decorator");
const roles_guard_1 = require("../accessControl/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const update_user_req_dto_1 = require("./models/dto/req/update-user.req.dto");
const user_mapper_1 = require("./services/user.mapper");
const users_service_1 = require("./services/users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async becomeSeller(userData) {
        const result = await this.usersService.becomeSeller(userData);
        return user_mapper_1.UserMapper.toResDto(result);
    }
    async me(userData) {
        const result = await this.usersService.me(userData);
        return user_mapper_1.UserMapper.toResDto(result);
    }
    async updateMe(userData, dto) {
        const result = await this.usersService.updateMe(userData, dto);
        return user_mapper_1.UserMapper.toResDto(result);
    }
    async deleteMe(userData) {
        await this.usersService.deleteMe(userData);
    }
    async updateAccount(userData) {
        const result = await this.usersService.updateAccount(userData);
        return user_mapper_1.UserMapper.toResDto(result);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Patch)('become-seller'),
    (0, swagger_1.ApiOperation)({ summary: 'Become a seller' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/user-base.res.dto").UserBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "becomeSeller", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Information about user' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/user-base.res.dto").UserBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user information' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/user-base.res.dto").UserBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_req_dto_1.UpdateUserReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Delete)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.USER, role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPER_ADMIN),
    (0, common_1.Patch)('account'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account to Premium ' }),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/user-base.res.dto").UserBaseResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAccount", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map