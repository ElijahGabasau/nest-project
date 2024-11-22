import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OfferID, ViewID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { OfferEntity } from './offer.entity';

@Entity(TableNameEnum.VIEWS)
export class ViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ViewID;

  @CreateDateColumn()
  created: Date;

  @Column()
  offer_id: OfferID;
  @ManyToOne(() => OfferEntity, (entity) => entity.views)
  @JoinColumn({ name: 'offer_id' })
  offer?: OfferEntity;
}
