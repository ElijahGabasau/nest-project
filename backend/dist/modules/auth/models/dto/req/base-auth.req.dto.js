"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAuthReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_base_req_dto_1 = require("../../../../users/models/dto/req/user-base.req.dto");
class BaseAuthReqDto extends (0, swagger_1.PickType)(user_base_req_dto_1.UserBaseReqDto, [
    'email',
    'password',
    'name',
    'phone',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.BaseAuthReqDto = BaseAuthReqDto;
//# sourceMappingURL=base-auth.req.dto.js.map