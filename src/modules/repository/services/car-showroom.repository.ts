import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';

@Injectable()
export class CarShowroomRepository extends Repository<CarShowroomEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarShowroomEntity, dataSource.manager);
  }
}
