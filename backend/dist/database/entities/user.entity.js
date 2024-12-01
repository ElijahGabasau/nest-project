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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../common/enums/role.enum");
const account_enum_1 = require("../../modules/users/models/enums/account.enum");
const car_showroom_entity_1 = require("./car-showroom.entity");
const table_name_enum_1 = require("./enums/table-name.enum");
const mechanic_entity_1 = require("./mechanic.entity");
const create_update_model_1 = require("./models/create-update.model");
const offer_entity_1 = require("./offer.entity");
const refresh_token_entity_1 = require("./refresh-token.entity");
let UserEntity = class UserEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: false, type: () => String }, account: { required: true, enum: require("../../modules/users/models/enums/account.enum").AccountEnum }, role: { required: true, enum: require("../../common/enums/role.enum").RoleEnum }, isHaveSalon: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, permissions: { required: true, enum: require("../../modules/accessControl/enums/permission.enum").PermissionEnum, isArray: true }, refreshTokens: { required: false, type: () => [require("./refresh-token.entity").RefreshTokenEntity] }, offers: { required: false, type: () => [require("./offer.entity").OfferEntity] }, carShowroom: { required: false, type: () => require("./car-showroom.entity").CarShowroomEntity }, mechanics: { required: false, type: () => [require("./mechanic.entity").MechanicEntity] } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: account_enum_1.AccountEnum, default: account_enum_1.AccountEnum.BASIC }),
    __metadata("design:type", String)
], UserEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: role_enum_1.RoleEnum, default: role_enum_1.RoleEnum.GUEST }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isHaveSalon", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { default: [] }),
    __metadata("design:type", Array)
], UserEntity.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshTokenEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offer_entity_1.OfferEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "offers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => car_showroom_entity_1.CarShowroomEntity, (entity) => entity.user),
    __metadata("design:type", car_showroom_entity_1.CarShowroomEntity)
], UserEntity.prototype, "carShowroom", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mechanic_entity_1.MechanicEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "mechanics", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.USERS)
], UserEntity);
//# sourceMappingURL=user.entity.js.map