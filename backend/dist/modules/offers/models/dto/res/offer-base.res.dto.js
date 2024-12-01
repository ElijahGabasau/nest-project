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
exports.OfferBaseResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class OfferBaseResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, brand: { required: true, type: () => String }, model: { required: true, type: () => String }, year: { required: false, type: () => Number }, priceInUAH: { required: true, type: () => Number }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../enums/currency.enum").CurrencyEnum }, currencyRate: { required: true, type: () => Number }, city: { required: true, type: () => String }, region: { required: true, type: () => String }, image: { required: false, type: () => String }, status: { required: true, enum: require("../../enums/status.enum").StatusEnum } };
    }
}
exports.OfferBaseResDto = OfferBaseResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], OfferBaseResDto.prototype, "id", void 0);
//# sourceMappingURL=offer-base.res.dto.js.map