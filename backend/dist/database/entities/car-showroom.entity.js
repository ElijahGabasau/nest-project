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
exports.CarShowroomEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const mechanic_entity_1 = require("./mechanic.entity");
const create_update_model_1 = require("./models/create-update.model");
const offer_entity_1 = require("./offer.entity");
const user_entity_1 = require("./user.entity");
let CarShowroomEntity = class CarShowroomEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: false, type: () => String }, user_id: { required: true, type: () => Object }, user: { required: false, type: () => require("./user.entity").UserEntity }, mechanics: { required: false, type: () => [require("./mechanic.entity").MechanicEntity] }, offers: { required: false, type: () => [require("./offer.entity").OfferEntity] } };
    }
};
exports.CarShowroomEntity = CarShowroomEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CarShowroomEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (entity) => entity.carShowroom),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CarShowroomEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mechanic_entity_1.MechanicEntity, (entity) => entity.carShowroom),
    __metadata("design:type", Array)
], CarShowroomEntity.prototype, "mechanics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offer_entity_1.OfferEntity, (entity) => entity.carShowroom),
    __metadata("design:type", Array)
], CarShowroomEntity.prototype, "offers", void 0);
exports.CarShowroomEntity = CarShowroomEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.CAR_SHOWROOM)
], CarShowroomEntity);
//# sourceMappingURL=car-showroom.entity.js.map