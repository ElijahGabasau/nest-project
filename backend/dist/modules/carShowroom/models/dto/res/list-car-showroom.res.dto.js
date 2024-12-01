"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCarShowroomResDto = void 0;
const openapi = require("@nestjs/swagger");
const list_car_showroom_query_dto_1 = require("../req/list-car-showroom-query.dto");
class ListCarShowroomResDto extends list_car_showroom_query_dto_1.ListCarShowroomQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./car-showroom-base.res.dto").CarShowroomBaseResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.ListCarShowroomResDto = ListCarShowroomResDto;
//# sourceMappingURL=list-car-showroom.res.dto.js.map