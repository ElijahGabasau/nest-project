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
exports.CarShowroomService = void 0;
const common_1 = require("@nestjs/common");
const car_showroom_repository_1 = require("../../repository/services/car-showroom.repository");
const user_repository_1 = require("../../repository/services/user.repository");
let CarShowroomService = class CarShowroomService {
    constructor(carShowroomRepository, userRepository) {
        this.carShowroomRepository = carShowroomRepository;
        this.userRepository = userRepository;
    }
    async create(userData, dto) {
        await this.userRepository.update(userData.userId, { isHaveSalon: true });
        return await this.carShowroomRepository.save(this.carShowroomRepository.create({
            ...dto,
            user_id: userData.userId,
        }));
    }
    async updateMyShowroom(userData, dto) {
        const carShowroom = await this.carShowroomRepository.findOneBy({
            user_id: userData.userId,
        });
        if (!carShowroom) {
            throw new common_1.ConflictException('You do not have a showroom');
        }
        carShowroom.description = dto.description;
        carShowroom.phone = dto.phone;
        return await this.carShowroomRepository.save(carShowroom);
    }
    async deleteMyShowroom(userData) {
        const carShowroom = await this.carShowroomRepository.findOneBy({
            user_id: userData.userId,
        });
        if (!carShowroom) {
            throw new common_1.ConflictException('You do not have a showroom to delete');
        }
        await this.userRepository.update(userData.userId, { isHaveSalon: false });
        await this.carShowroomRepository.remove(carShowroom);
    }
    async getMyShowroom(userData) {
        return await this.carShowroomRepository.findOneBy({
            user_id: userData.userId,
        });
    }
    async findAll(query) {
        return await this.carShowroomRepository.findAll(query);
    }
    async getShowroom(showroomId) {
        const showroom = await this.carShowroomRepository.findOneBy({
            id: showroomId,
        });
        if (!showroom) {
            throw new common_1.ConflictException('Showroom not found');
        }
        return showroom;
    }
    async deleteShowroom(showroomId) {
        const showroom = await this.carShowroomRepository.findOneBy({
            id: showroomId,
        });
        if (!showroom) {
            throw new common_1.ConflictException('Showroom not found');
        }
        await this.userRepository.update(showroom.user_id, { isHaveSalon: false });
        await this.carShowroomRepository.remove(showroom);
    }
};
exports.CarShowroomService = CarShowroomService;
exports.CarShowroomService = CarShowroomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [car_showroom_repository_1.CarShowroomRepository,
        user_repository_1.UserRepository])
], CarShowroomService);
//# sourceMappingURL=car-showroom.service.js.map