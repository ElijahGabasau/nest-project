import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MechanicEntity } from '../../../database/entities/mechanic.entity';

@Injectable()
export class MechanicRepository extends Repository<MechanicEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MechanicEntity, dataSource.manager);
  }
}
