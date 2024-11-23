import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { AccountEnum } from '../../modules/users/models/enums/account.enum';
import { CarShowroomEntity } from './car-showroom.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { MechanicEntity } from './mechanic.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { OfferEntity } from './offer.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  phone?: string;

  @Column('enum', { enum: AccountEnum, default: AccountEnum.BASIC })
  account: AccountEnum;

  @Column('enum', { enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Column('boolean', { default: false })
  isHaveSalon: boolean;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity.user)
  offers?: OfferEntity[];

  @OneToMany(() => CarShowroomEntity, (entity) => entity.user)
  carShowrooms?: CarShowroomEntity[];

  @OneToMany(() => MechanicEntity, (entity) => entity.user)
  mechanics?: MechanicEntity[];
}
