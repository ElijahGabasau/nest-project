import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { ListCarShowroomQueryDto } from '../../carShowroom/models/dto/req/list-car-showroom-query.dto';

@Injectable()
export class CarShowroomRepository extends Repository<CarShowroomEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarShowroomEntity, dataSource.manager);
  }

  public async findAll(
    query: ListCarShowroomQueryDto,
  ): Promise<[CarShowroomEntity[], number]> {
    const qb = this.createQueryBuilder('carShowroom');
    qb.leftJoinAndSelect('carShowroom.user', 'user');

    if (query.search) {
      qb.andWhere('CONCAT(carShowroom.name) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
