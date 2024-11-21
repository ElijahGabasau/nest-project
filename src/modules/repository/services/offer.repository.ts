import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { OfferEntity } from '../../../database/entities/offer.entity';

@Injectable()
export class OfferRepository extends Repository<OfferEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OfferEntity, dataSource.manager);
  }
}
