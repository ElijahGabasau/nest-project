"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortOfferResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const offer_base_res_dto_1 = require("./offer-base.res.dto");
class ShortOfferResDto extends (0, swagger_1.PickType)(offer_base_res_dto_1.OfferBaseResDto, [
    'id',
    'title',
    'brand',
    'model',
    'image',
    'priceInUAH',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ShortOfferResDto = ShortOfferResDto;
//# sourceMappingURL=short-offer.res.dto.js.map