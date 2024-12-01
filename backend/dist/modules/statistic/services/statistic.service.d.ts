import { OfferID } from '../../../common/types/entity-ids.type';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { OfferRepository } from '../../repository/services/offer.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { StatisticBaseResDto } from '../models/dto/res/statistic-base.res.dto';
export declare class StatisticService {
    private readonly viewRepository;
    private readonly offerRepository;
    private readonly userRepository;
    constructor(viewRepository: ViewRepository, offerRepository: OfferRepository, userRepository: UserRepository);
    getStatistic(userData: IUserData, offerId: OfferID): Promise<StatisticBaseResDto>;
}
