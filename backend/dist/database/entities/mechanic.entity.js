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
exports.MechanicEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const car_showroom_entity_1 = require("./car-showroom.entity");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
let MechanicEntity = class MechanicEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, experienceInYears: { required: true, type: () => Number }, role: { required: true, enum: require("../../common/enums/role.enum").RoleEnum }, user_id: { required: true, type: () => Object }, user: { required: false, type: () => require("./user.entity").UserEntity }, carShowroom_id: { required: true, type: () => Object }, carShowroom: { required: false, type: () => require("./car-showroom.entity").CarShowroomEntity } };
    }
};
exports.MechanicEntity = MechanicEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MechanicEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MechanicEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], MechanicEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MechanicEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Number)
], MechanicEntity.prototype, "experienceInYears", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: role_enum_1.RoleEnum, default: role_enum_1.RoleEnum.SHOWROOM_MECHANIC }),
    __metadata("design:type", String)
], MechanicEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MechanicEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.mechanics),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], MechanicEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MechanicEntity.prototype, "carShowroom_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => car_showroom_entity_1.CarShowroomEntity, (entity) => entity.mechanics, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'carShowroom_id' }),
    __metadata("design:type", car_showroom_entity_1.CarShowroomEntity)
], MechanicEntity.prototype, "carShowroom", void 0);
exports.MechanicEntity = MechanicEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.MECHANICS)
], MechanicEntity);
//# sourceMappingURL=mechanic.entity.js.map