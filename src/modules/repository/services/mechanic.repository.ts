import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { ListMechanicQueryDto } from '../../mechanics/models/dto/req/list-mechanic-query.dto';

@Injectable()
export class MechanicRepository extends Repository<MechanicEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MechanicEntity, dataSource.manager);
  }

  public async findAllBy(
    query: ListMechanicQueryDto,
  ): Promise<[MechanicEntity[], number]> {
    const qb = this.createQueryBuilder('mechanics');
    qb.leftJoinAndSelect('mechanics.carShowroom', 'carShowroom');

    if (query.search) {
      qb.andWhere(
        'CONCAT(mechanics.name, mechanics.carShowroom_id) ILIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
