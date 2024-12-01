"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOfferReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const offer_base_req_dto_1 = require("./offer-base.req.dto");
class UpdateOfferReqDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(offer_base_req_dto_1.OfferBaseReqDto, [
    'title',
    'currency',
    'price',
    'description',
    'city',
    'region',
])) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOfferReqDto = UpdateOfferReqDto;
//# sourceMappingURL=update-offer.req.dto.js.map