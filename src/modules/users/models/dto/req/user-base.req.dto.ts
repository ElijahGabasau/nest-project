import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { RoleEnum } from '../../../../../common/enums/role.enum';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { AccountEnum } from '../../enums/account.enum';

export class UserBaseReqDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @IsEmail()
  @Length(10, 150)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @Transform(TransformHelper.trim)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(10, 200)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  @Transform(TransformHelper.trim)
  password: string;

  @IsOptional()
  @ApiProperty({ example: '+380501234567' })
  @IsString()
  @Length(10, 15)
  @Matches(/^\+380\d{9}$/)
  phone?: string;

  @IsEnum(AccountEnum)
  @ApiProperty({ default: AccountEnum.BASIC })
  account: AccountEnum;

  @IsEnum(RoleEnum)
  @ApiProperty({ default: RoleEnum.USER })
  role: RoleEnum;

  @IsOptional()
  @ApiProperty({ default: false })
  isHaveSalon: boolean;
}
