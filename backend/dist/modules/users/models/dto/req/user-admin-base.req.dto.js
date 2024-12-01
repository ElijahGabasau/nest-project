"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdminBaseReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_base_req_dto_1 = require("./user-base.req.dto");
class UserAdminBaseReqDto extends (0, swagger_1.PickType)(user_base_req_dto_1.UserBaseReqDto, [
    'name',
    'email',
    'password',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserAdminBaseReqDto = UserAdminBaseReqDto;
//# sourceMappingURL=user-admin-base.req.dto.js.map