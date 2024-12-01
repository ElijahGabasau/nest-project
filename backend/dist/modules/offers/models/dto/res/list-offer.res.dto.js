"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfferResDto = void 0;
const openapi = require("@nestjs/swagger");
const list_offer_query_dto_1 = require("../req/list-offer-query.dto");
class ListOfferResDto extends list_offer_query_dto_1.ListOfferQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./short-offer.res.dto").ShortOfferResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.ListOfferResDto = ListOfferResDto;
//# sourceMappingURL=list-offer.res.dto.js.map