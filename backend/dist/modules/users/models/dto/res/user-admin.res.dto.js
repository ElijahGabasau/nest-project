"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdminResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_base_res_dto_1 = require("./user-base.res.dto");
class UserAdminResDto extends (0, swagger_1.PickType)(user_base_res_dto_1.UserBaseResDto, [
    'name',
    'id',
    'role',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserAdminResDto = UserAdminResDto;
//# sourceMappingURL=user-admin.res.dto.js.map