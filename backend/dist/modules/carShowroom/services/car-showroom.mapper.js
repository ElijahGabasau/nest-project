"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShowroomMapper = void 0;
class CarShowroomMapper {
    static toResDto(carShowroom) {
        return {
            id: carShowroom.id,
            name: carShowroom.name,
            description: carShowroom.description,
            email: carShowroom.email,
            phone: carShowroom.phone,
        };
    }
    static toResDtoList(data, total, query) {
        return { data: data.map(this.toResDto), total, ...query };
    }
}
exports.CarShowroomMapper = CarShowroomMapper;
//# sourceMappingURL=car-showroom.mapper.js.map