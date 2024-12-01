import { OfferID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { StatisticBaseResDto } from './models/dto/res/statistic-base.res.dto';
import { StatisticService } from './services/statistic.service';
export declare class StatisticController {
    private readonly statisticService;
    constructor(statisticService: StatisticService);
    getStatistic(userData: IUserData, offerId: OfferID): Promise<StatisticBaseResDto>;
}
