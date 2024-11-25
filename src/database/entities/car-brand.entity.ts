import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CarBrandID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { OfferEntity } from './offer.entity';

@Entity(TableNameEnum.CAR_BRAND)
export class CarBrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CarBrandID;

  @Column()
  brand: string;

  @OneToOne(() => OfferEntity, (entity) => entity.brand)
  offer?: OfferEntity;
}
