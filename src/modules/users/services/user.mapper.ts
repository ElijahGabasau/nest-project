import { RoleEnum } from '../../../common/enums/role.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { UserAdminResDto } from '../models/dto/res/user-admin.res.dto';
import { UserBaseResDto } from '../models/dto/res/user-base.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserBaseResDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      account: user.account,
      role: user.role,
      isDeleted: user.isDeleted,
    };
  }

  public static toIUserData(
    user: UserEntity,
    jwtPayload: IJwtPayload,
  ): IUserData {
    return {
      userId: user.id,
      email: user.email,
      role: user.role || RoleEnum.USER,
      permissions: user.permissions,
    };
  }

  public static toAdminResDto(user: UserEntity): UserAdminResDto {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
