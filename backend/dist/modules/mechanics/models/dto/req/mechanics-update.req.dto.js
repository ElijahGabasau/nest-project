"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicsUpdateReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const mechanics_base_req_dto_1 = require("./mechanics-base.req.dto");
class MechanicsUpdateReqDto extends (0, swagger_1.PickType)(mechanics_base_req_dto_1.MechanicsBaseReqDto, [
    'phone',
    'experienceInYears',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.MechanicsUpdateReqDto = MechanicsUpdateReqDto;
//# sourceMappingURL=mechanics-update.req.dto.js.map