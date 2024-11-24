import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEnum } from '../../common/enums/role.enum';
import {
  CarShowroomID,
  MechanicID,
  UserID,
} from '../../common/types/entity-ids.type';
import { CarShowroomEntity } from './car-showroom.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

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
  experienceInYears: number;

  @Column('enum', { enum: RoleEnum, default: RoleEnum.SHOWROOM_MECHANIC })
  role: RoleEnum;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.mechanics)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  carShowroom_id: CarShowroomID;
  @ManyToOne(() => CarShowroomEntity, (entity) => entity.mechanics)
  @JoinColumn({ name: 'carShowroom_id' })
  carShowroom?: CarShowroomEntity;
}
