"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShowroomUpdateReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const car_showroom_base_req_dto_1 = require("./car-showroom-base.req.dto");
class CarShowroomUpdateReqDto extends (0, swagger_1.PickType)(car_showroom_base_req_dto_1.CarShowroomBaseReqDto, [
    'phone',
    'description',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CarShowroomUpdateReqDto = CarShowroomUpdateReqDto;
//# sourceMappingURL=car-showroom-update.req.dto.js.map