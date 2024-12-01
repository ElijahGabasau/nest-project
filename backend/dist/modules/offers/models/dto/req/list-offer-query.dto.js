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
exports.ListOfferQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../../common/helpers/transform.helper");
class ListOfferQueryDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 300 }, offset: { required: false, type: () => Number, default: 0, minimum: 0 }, search: { required: false, type: () => String } };
    }
}
exports.ListOfferQueryDto = ListOfferQueryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(300),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListOfferQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListOfferQueryDto.prototype, "offset", void 0);
__decorate([
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.toLowerCase),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListOfferQueryDto.prototype, "search", void 0);
//# sourceMappingURL=list-offer-query.dto.js.map