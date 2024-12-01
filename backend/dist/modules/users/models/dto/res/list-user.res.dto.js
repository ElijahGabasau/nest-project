"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserResDto = void 0;
const openapi = require("@nestjs/swagger");
const list_user_query_dto_1 = require("../req/list-user-query.dto");
class ListUserResDto extends list_user_query_dto_1.ListUserQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./user-base.res.dto").UserBaseResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.ListUserResDto = ListUserResDto;
//# sourceMappingURL=list-user.res.dto.js.map