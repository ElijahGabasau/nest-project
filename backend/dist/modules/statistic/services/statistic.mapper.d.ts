import { StatisticBaseReqDto } from '../models/dto/req/statistic-base.req.dto';
import { StatisticBaseResDto } from '../models/dto/res/statistic-base.res.dto';
export declare class StatisticMapper {
    static toResDto(statistic: StatisticBaseReqDto): StatisticBaseResDto;
}
