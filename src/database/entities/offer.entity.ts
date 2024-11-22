import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CarShowroomID,
  OfferID,
  UserID,
} from '../../common/types/entity-ids.type';
import { BrandEnum } from '../../modules/offers/models/enums/brand.enum';
import { CurrencyEnum } from '../../modules/offers/models/enums/currency.enum';
import { CarShowroomEntity } from './car-showroom.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { ViewEntity } from './view.entity';

@Entity(TableNameEnum.OFFERS)
export class OfferEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: OfferID;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('enum', { enum: BrandEnum })
  brand: BrandEnum;

  @Column('text')
  model: string;

  @Column('text', { nullable: true })
  year?: number;

  @Column('text')
  price: number;

  @Column('enum', { enum: CurrencyEnum })
  currency: CurrencyEnum;

  @Column('text')
  city: string;

  @Column('text')
  region: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('boolean', { default: false })
  isSalon: boolean;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.offers)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  carShowroom_id: CarShowroomID;
  @ManyToOne(() => CarShowroomEntity, (entity) => entity.offers)
  @JoinColumn({ name: 'carShowroom_id' })
  carShowroom?: CarShowroomEntity;

  @OneToMany(() => ViewEntity, (entity) => entity.offer)
  views?: ViewEntity[];
}
