"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMechanicsResDto = void 0;
const openapi = require("@nestjs/swagger");
const list_mechanic_query_dto_1 = require("../req/list-mechanic-query.dto");
class ListMechanicsResDto extends list_mechanic_query_dto_1.ListMechanicQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./mechanics-base.res.dto").MechanicsBaseResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.ListMechanicsResDto = ListMechanicsResDto;
//# sourceMappingURL=list-mechanics.res.dto.js.map