import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ShowRoomID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.CAR_SHOWROOM)
export class CarShowroomEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ShowRoomID;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  phone?: string;
}
