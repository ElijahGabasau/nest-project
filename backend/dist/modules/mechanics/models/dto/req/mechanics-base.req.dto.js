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
exports.MechanicsBaseReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
class MechanicsBaseReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 50 }, email: { required: true, type: () => String, format: "email", minLength: 10, maxLength: 150, pattern: "/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/" }, phone: { required: true, type: () => String, minLength: 10, maxLength: 15, pattern: "/^\\+380\\d{9}$/" }, experienceInYears: { required: false, type: () => Number } };
    }
}
exports.MechanicsBaseReqDto = MechanicsBaseReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], MechanicsBaseReqDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(10, 150),
    (0, class_validator_1.Matches)(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], MechanicsBaseReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380501234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 15),
    (0, class_validator_1.Matches)(/^\+380\d{9}$/),
    __metadata("design:type", String)
], MechanicsBaseReqDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MechanicsBaseReqDto.prototype, "experienceInYears", void 0);
//# sourceMappingURL=mechanics-base.req.dto.js.map