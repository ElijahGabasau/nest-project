"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticMapper = void 0;
class StatisticMapper {
    static toResDto(statistic) {
        return {
            views: statistic.views,
            viewsPerDay: statistic.viewsPerDay,
            viewsPerWeek: statistic.viewsPerWeek,
            viewsPerMonth: statistic.viewsPerMonth,
            averagePriceByRegionInUAH: statistic.averagePriceByRegionInUAH,
            averagePriceByUkraineInUAH: statistic.averagePriceByUkraineInUAH,
        };
    }
}
exports.StatisticMapper = StatisticMapper;
//# sourceMappingURL=statistic.mapper.js.map