import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CarShowroomID,
  OfferID,
  UserID,
} from '../../common/types/entity-ids.type';
import { CurrencyEnum } from '../../modules/offers/models/enums/currency.enum';
import { StatusEnum } from '../../modules/offers/models/enums/status.enum';
import { CarBrandEntity } from './car-brand.entity';
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

  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text', { nullable: true })
  year?: number;

  @Column('int', { default: 0 })
  price: number;

  @Column('enum', { enum: CurrencyEnum })
  currency: CurrencyEnum;

  @Column('int', { default: 0 })
  priceInUAH: number;

  @Column('text')
  currencyRate: number;

  @Column('text', { nullable: true, default: null })
  city: string;

  @Column('text', { nullable: true, default: null })
  region: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('enum', { enum: StatusEnum })
  status: StatusEnum;

  @Column('boolean', { default: false })
  isSalon: boolean;

  @Column('smallint', { default: 0 })
  attempts: number;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.offers)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ nullable: true })
  carShowroom_id?: CarShowroomID;
  @ManyToOne(() => CarShowroomEntity, (entity) => entity.offers)
  @JoinColumn({ name: 'carShowroom_id' })
  carShowroom?: CarShowroomEntity;

  @OneToMany(() => ViewEntity, (entity) => entity.offer)
  views?: ViewEntity[];

  @OneToOne(() => CarBrandEntity, (entity) => entity.offer)
  carBrand?: CarBrandEntity;
}
