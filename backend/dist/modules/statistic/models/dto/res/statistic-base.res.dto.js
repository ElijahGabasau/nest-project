"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticBaseResDto = void 0;
const openapi = require("@nestjs/swagger");
class StatisticBaseResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { views: { required: true, type: () => Number }, viewsPerDay: { required: true, type: () => Number }, viewsPerWeek: { required: true, type: () => Number }, viewsPerMonth: { required: true, type: () => Number }, averagePriceByRegionInUAH: { required: true, type: () => Number }, averagePriceByUkraineInUAH: { required: true, type: () => Number } };
    }
}
exports.StatisticBaseResDto = StatisticBaseResDto;
//# sourceMappingURL=statistic-base.res.dto.js.map