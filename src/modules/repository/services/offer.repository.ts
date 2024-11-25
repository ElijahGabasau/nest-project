import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OfferEntity } from '../../../database/entities/offer.entity';
import { ListOfferQueryDto } from '../../offers/models/dto/req/list-offer-query.dto';

@Injectable()
export class OfferRepository extends Repository<OfferEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OfferEntity, dataSource.manager);
  }

  public async findAll(
    query: ListOfferQueryDto,
  ): Promise<[OfferEntity[], number]> {
    const qb = this.createQueryBuilder('offers');
    qb.leftJoinAndSelect('offers.user', 'user');

    if (query.search) {
      qb.andWhere('CONCAT(offers.brand, offers.model) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
