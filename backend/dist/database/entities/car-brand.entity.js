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
exports.CarBrandEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const offer_entity_1 = require("./offer.entity");
let CarBrandEntity = class CarBrandEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, brand: { required: true, type: () => String }, offer: { required: false, type: () => require("./offer.entity").OfferEntity } };
    }
};
exports.CarBrandEntity = CarBrandEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CarBrandEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CarBrandEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => offer_entity_1.OfferEntity, (entity) => entity.brand),
    __metadata("design:type", offer_entity_1.OfferEntity)
], CarBrandEntity.prototype, "offer", void 0);
exports.CarBrandEntity = CarBrandEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.CAR_BRAND)
], CarBrandEntity);
//# sourceMappingURL=car-brand.entity.js.map