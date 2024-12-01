"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_base_req_dto_1 = require("./user-base.req.dto");
class UpdateUserReqDto extends (0, swagger_1.PickType)(user_base_req_dto_1.UserBaseReqDto, [
    'phone',
    'name',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserReqDto = UpdateUserReqDto;
//# sourceMappingURL=update-user.req.dto.js.map