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
exports.OfferEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const currency_enum_1 = require("../../modules/offers/models/enums/currency.enum");
const status_enum_1 = require("../../modules/offers/models/enums/status.enum");
const car_brand_entity_1 = require("./car-brand.entity");
const car_showroom_entity_1 = require("./car-showroom.entity");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
const view_entity_1 = require("./view.entity");
let OfferEntity = class OfferEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, brand: { required: true, type: () => String }, model: { required: true, type: () => String }, year: { required: false, type: () => Number }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../../modules/offers/models/enums/currency.enum").CurrencyEnum }, priceInUAH: { required: true, type: () => Number }, currencyRate: { required: true, type: () => Number }, city: { required: true, type: () => String }, region: { required: true, type: () => String }, image: { required: false, type: () => String }, status: { required: true, enum: require("../../modules/offers/models/enums/status.enum").StatusEnum }, isSalon: { required: true, type: () => Boolean }, attempts: { required: true, type: () => Number }, user_id: { required: true, type: () => Object }, user: { required: false, type: () => require("./user.entity").UserEntity }, carShowroom_id: { required: false, type: () => Object }, carShowroom: { required: false, type: () => require("./car-showroom.entity").CarShowroomEntity }, views: { required: false, type: () => [require("./view.entity").ViewEntity] }, carBrand: { required: false, type: () => require("./car-brand.entity").CarBrandEntity } };
    }
};
exports.OfferEntity = OfferEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OfferEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OfferEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OfferEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OfferEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: currency_enum_1.CurrencyEnum }),
    __metadata("design:type", String)
], OfferEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "priceInUAH", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", Number)
], OfferEntity.prototype, "currencyRate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, default: null }),
    __metadata("design:type", String)
], OfferEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, default: null }),
    __metadata("design:type", String)
], OfferEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: status_enum_1.StatusEnum, default: status_enum_1.StatusEnum.PENDING }),
    __metadata("design:type", String)
], OfferEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], OfferEntity.prototype, "isSalon", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: 0 }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OfferEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.offers),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OfferEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "carShowroom_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_showroom_entity_1.CarShowroomEntity, (entity) => entity.offers),
    (0, typeorm_1.JoinColumn)({ name: 'carShowroom_id' }),
    __metadata("design:type", car_showroom_entity_1.CarShowroomEntity)
], OfferEntity.prototype, "carShowroom", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => view_entity_1.ViewEntity, (entity) => entity.offer),
    __metadata("design:type", Array)
], OfferEntity.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => car_brand_entity_1.CarBrandEntity, (entity) => entity.offer),
    __metadata("design:type", car_brand_entity_1.CarBrandEntity)
], OfferEntity.prototype, "carBrand", void 0);
exports.OfferEntity = OfferEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.OFFERS)
], OfferEntity);
//# sourceMappingURL=offer.entity.js.map