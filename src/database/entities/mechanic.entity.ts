import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../../common/enums/role.enum';
import { MechanicID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.MECHANICS)
export class MechanicEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: MechanicID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  phone: string;

  @Column('text', { nullable: true })
  experience: number;

  @Column('enum', { enum: RoleEnum, default: RoleEnum.SHOWROOM_MECHANIC })
  role: RoleEnum;
}
