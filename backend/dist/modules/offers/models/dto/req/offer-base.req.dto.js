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
exports.OfferBaseReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
const currency_enum_1 = require("../../enums/currency.enum");
class OfferBaseReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, minLength: 1, maxLength: 50 }, description: { required: true, type: () => String, minLength: 1, maxLength: 200 }, brand: { required: true, type: () => String }, model: { required: true, type: () => String, minLength: 1, maxLength: 50 }, year: { required: false, type: () => Number, minimum: 1950, maximum: 2024 }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../enums/currency.enum").CurrencyEnum }, city: { required: false, type: () => String }, region: { required: false, type: () => String } };
    }
}
exports.OfferBaseReqDto = OfferBaseReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1950),
    (0, class_validator_1.Max)(2024),
    __metadata("design:type", Number)
], OfferBaseReqDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OfferBaseReqDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(currency_enum_1.CurrencyEnum),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: null }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: null }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OfferBaseReqDto.prototype, "region", void 0);
//# sourceMappingURL=offer-base.req.dto.js.map