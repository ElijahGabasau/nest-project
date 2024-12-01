"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferMapper = void 0;
class OfferMapper {
    static toResDto(offer) {
        return {
            id: offer.id,
            title: offer.title,
            description: offer.description,
            brand: offer.brand,
            model: offer.model,
            year: offer.year,
            priceInUAH: offer.priceInUAH,
            price: offer.price,
            currency: offer.currency,
            currencyRate: offer.currencyRate,
            city: offer.city,
            region: offer.region,
            image: offer.image,
            status: offer.status,
        };
    }
    static toResDtoList(data, total, query) {
        return {
            data: data.map((offer) => this.toResDto(offer)),
            total,
            ...query,
        };
    }
    static toResDtoBrand(brand) {
        return {
            id: brand.id,
            brand: brand.brand,
        };
    }
}
exports.OfferMapper = OfferMapper;
//# sourceMappingURL=offer.mapper.js.map