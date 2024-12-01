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
exports.MechanicRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const mechanic_entity_1 = require("../../../database/entities/mechanic.entity");
let MechanicRepository = class MechanicRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(mechanic_entity_1.MechanicEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async findAllBy(query) {
        const qb = this.createQueryBuilder('mechanics');
        qb.leftJoinAndSelect('mechanics.carShowroom', 'carShowroom');
        if (query.search) {
            qb.andWhere('CONCAT(mechanics.name, mechanics.carShowroom_id) ILIKE :search');
            qb.setParameter('search', `%${query.search}%`);
        }
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
};
exports.MechanicRepository = MechanicRepository;
exports.MechanicRepository = MechanicRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MechanicRepository);
//# sourceMappingURL=mechanic.repository.js.map