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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBaseReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../../../../../common/enums/role.enum");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
const account_enum_1 = require("../../enums/account.enum");
class UserBaseReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 50 }, email: { required: true, type: () => String, format: "email", minLength: 10, maxLength: 150, pattern: "/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/" }, password: { required: true, type: () => String, minLength: 10, maxLength: 200, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%_*#?&])[A-Za-z\\d@$_!%*#?&]{8,}$/" }, phone: { required: false, type: () => String, minLength: 10, maxLength: 15, pattern: "/^\\+380\\d{9}$/" }, account: { required: true, enum: require("../../enums/account.enum").AccountEnum }, role: { required: true, enum: require("../../../../../common/enums/role.enum").RoleEnum }, isHaveSalon: { required: true, type: () => Boolean } };
    }
}
exports.UserBaseReqDto = UserBaseReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@test.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(10, 150),
    (0, class_validator_1.Matches)(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123qwe!@#QWE' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 200),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: '+380501234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 15),
    (0, class_validator_1.Matches)(/^\+380\d{9}$/),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(account_enum_1.AccountEnum),
    (0, swagger_1.ApiProperty)({ default: account_enum_1.AccountEnum.BASIC }),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.RoleEnum),
    (0, swagger_1.ApiProperty)({ default: role_enum_1.RoleEnum.USER }),
    __metadata("design:type", String)
], UserBaseReqDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: false }),
    __metadata("design:type", Boolean)
], UserBaseReqDto.prototype, "isHaveSalon", void 0);
//# sourceMappingURL=user-base.req.dto.js.map