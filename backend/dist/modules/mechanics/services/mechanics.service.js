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
exports.MechanicsService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../../common/enums/role.enum");
const car_showroom_repository_1 = require("../../repository/services/car-showroom.repository");
const mechanic_repository_1 = require("../../repository/services/mechanic.repository");
let MechanicsService = class MechanicsService {
    constructor(mechanicRepository, carShowroomRepository) {
        this.mechanicRepository = mechanicRepository;
        this.carShowroomRepository = carShowroomRepository;
    }
    async create(userData, dto) {
        await this.isEmailExist(dto.email);
        const carShowroom = await this.carShowroomRepository.findOneBy({
            user_id: userData.userId,
        });
        if (!carShowroom) {
            throw new common_1.ConflictException('You cannot create mechanic without showroom');
        }
        const newMechanic = await this.mechanicRepository.save(this.mechanicRepository.create({
            ...dto,
            user_id: userData.userId,
            carShowroom_id: carShowroom.id,
            role: role_enum_1.RoleEnum.SHOWROOM_MECHANIC,
        }));
        const mechanicWithShowroom = await this.mechanicRepository.findOne({
            where: { id: newMechanic.id },
            relations: ['carShowroom'],
        });
        return mechanicWithShowroom;
    }
    async update(userData, dto, mechanicId) {
        const mechanic = await this.mechanicRepository.findOneBy({
            id: mechanicId,
            user_id: userData.userId,
        });
        if (!mechanic) {
            throw new common_1.BadRequestException('Mechanic not found or is not yours mechanic');
        }
        mechanic.experienceInYears = dto.experienceInYears;
        mechanic.phone = dto.phone;
        const updatedMechanic = await this.mechanicRepository.save(mechanic);
        const mechanicWithShowroom = await this.mechanicRepository.findOne({
            where: { id: updatedMechanic.id },
            relations: ['carShowroom'],
        });
        return mechanicWithShowroom;
    }
    async getAll(query) {
        return await this.mechanicRepository.findAllBy(query);
    }
    async getMyMechanic(userData, mechanicId) {
        const mechanic = await this.mechanicRepository.findOneBy({
            id: mechanicId,
            user_id: userData.userId,
        });
        if (!mechanic) {
            throw new common_1.BadRequestException('Mechanic not found or is not yours mechanic');
        }
        const mechanicWithShowroom = await this.mechanicRepository.findOne({
            where: { id: mechanic.id },
            relations: ['carShowroom'],
        });
        return mechanicWithShowroom;
    }
    async getById(mechanicId) {
        const mechanic = await this.mechanicRepository.findOneBy({
            id: mechanicId,
        });
        if (!mechanic) {
            throw new common_1.BadRequestException('Mechanic not found');
        }
        const mechanicWithShowroom = await this.mechanicRepository.findOne({
            where: { id: mechanic.id },
            relations: ['carShowroom'],
        });
        return mechanicWithShowroom;
    }
    async deleteMyMechanic(userData, mechanicId) {
        const mechanic = await this.mechanicRepository.findOneBy({
            id: mechanicId,
            user_id: userData.userId,
        });
        if (!mechanic) {
            throw new common_1.BadRequestException('Mechanic not found or is not yours mechanic');
        }
        await this.mechanicRepository.remove(mechanic);
    }
    async deleteById(mechanicId) {
        const mechanic = await this.mechanicRepository.findOneBy({
            id: mechanicId,
        });
        if (!mechanic) {
            throw new common_1.BadRequestException('Mechanic not found');
        }
        await this.mechanicRepository.remove(mechanic);
    }
    async isEmailExist(email) {
        const mechanic = await this.mechanicRepository.findOneBy({ email });
        if (mechanic) {
            throw new common_1.ConflictException('Email already exist');
        }
    }
};
exports.MechanicsService = MechanicsService;
exports.MechanicsService = MechanicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mechanic_repository_1.MechanicRepository,
        car_showroom_repository_1.CarShowroomRepository])
], MechanicsService);
//# sourceMappingURL=mechanics.service.js.map