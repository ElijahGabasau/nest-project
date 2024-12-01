"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicMapper = void 0;
const car_showroom_mapper_1 = require("../../carShowroom/services/car-showroom.mapper");
class MechanicMapper {
    static toResDto(mechanic) {
        return {
            id: mechanic.id,
            name: mechanic.name,
            email: mechanic.email,
            phone: mechanic.phone,
            experienceInYears: mechanic.experienceInYears,
            carShowroom: mechanic.carShowroom
                ? car_showroom_mapper_1.CarShowroomMapper.toResDto(mechanic.carShowroom)
                : null,
        };
    }
    static toResDtoList(data, total, query) {
        return { data: data.map(this.toResDto), total, ...query };
    }
}
exports.MechanicMapper = MechanicMapper;
//# sourceMappingURL=mechanic.mapper.js.map