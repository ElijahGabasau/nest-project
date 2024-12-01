import { StatisticBaseReqDto } from '../models/dto/req/statistic-base.req.dto';
import { StatisticBaseResDto } from '../models/dto/res/statistic-base.res.dto';

export class StatisticMapper {
  public static toResDto(statistic: StatisticBaseReqDto): StatisticBaseResDto {
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
