"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserShortResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_base_res_dto_1 = require("./user-base.res.dto");
class UserShortResDto extends (0, swagger_1.PickType)(user_base_res_dto_1.UserBaseResDto, [
    'name',
    'email',
    'role',
    'id',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserShortResDto = UserShortResDto;
//# sourceMappingURL=user-short.res.dto.js.map