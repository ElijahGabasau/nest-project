import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarShowroomID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { MechanicEntity } from './mechanic.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { OfferEntity } from './offer.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.CAR_SHOWROOM)
export class CarShowroomEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarShowroomID;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  phone?: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.carShowrooms)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => MechanicEntity, (entity) => entity.carShowroom)
  mechanics?: MechanicEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity.carShowroom)
  offers?: OfferEntity[];
}
