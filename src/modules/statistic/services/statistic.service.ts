import { ForbiddenException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Between } from 'typeorm';

import { RoleEnum } from '../../../common/enums/role.enum';
import { OfferID } from '../../../common/types/entity-ids.type';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { StatusEnum } from '../../offers/models/enums/status.enum';
import { OfferRepository } from '../../repository/services/offer.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { StatisticBaseResDto } from '../models/dto/res/statistic-base.res.dto';

dayjs.extend(utc);

@Injectable()
export class StatisticService {
  constructor(
    private readonly viewRepository: ViewRepository,
    private readonly offerRepository: OfferRepository,
  ) {}

  public async getStatistic(
    userData: IUserData,
    offerId: OfferID,
  ): Promise<StatisticBaseResDto> {
    const now = dayjs();
    const startOfDay = now.startOf('day');
    const endOfDay = now.endOf('day');
    const week = now.subtract(1, 'week');
    const month = now.subtract(1, 'month');

    if (userData.role === RoleEnum.USER) {
      throw new ForbiddenException(
        'Only user with premium account can get statistic',
      );
    }

    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
    });
    if (offer.status !== StatusEnum.ACTIVE) {
      throw new ForbiddenException(
        'You can get statistic only for active offers',
      );
    }

    const views = await this.viewRepository.count({
      where: { offer_id: offerId },
    });

    const viewsPerDay = await this.viewRepository.count({
      where: {
        offer_id: offerId,
        created: Between(startOfDay.toDate(), endOfDay.toDate()),
      },
    });

    const viewsPerWeek = await this.viewRepository.count({
      where: {
        offer_id: offerId,
        created: Between(week.toDate(), now.toDate()),
      },
    });

    const viewsPerMonth = await this.viewRepository.count({
      where: {
        offer_id: offerId,
        created: Between(month.toDate(), now.toDate()),
      },
    });

    const averagePriceByUkraineInUAH = await this.offerRepository.average(
      'priceInUAH',
      {
        brand: offer.brand,
      },
    );

    const cityOrRegion: Record<string, string> = {
      brand: offer.brand,
    };
    if (offer.city) {
      cityOrRegion.city = offer.city;
    } else {
      cityOrRegion.region = offer.region;
    }
    const averagePriceByRegionInUAH = await this.offerRepository.average(
      'priceInUAH',
      cityOrRegion,
    );

    return {
      views,
      viewsPerDay,
      viewsPerWeek,
      viewsPerMonth,
      averagePriceByRegionInUAH,
      averagePriceByUkraineInUAH,
    };
  }
}
