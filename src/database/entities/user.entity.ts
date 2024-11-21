import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { AccountEnum } from '../../modules/users/models/enums/account.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

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

  @Column('text')
  phone: string;

  @Column('enum', { enum: AccountEnum, default: AccountEnum.BASIC })
  account: AccountEnum;

  @Column('enum', { enum: RoleEnum, default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  @Column('boolean', { default: false })
  isHaveSalon: boolean;

  @Column('timestamp', { nullable: true })
  deleted?: Date;
}
