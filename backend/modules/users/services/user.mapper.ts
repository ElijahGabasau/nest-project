import { RoleEnum } from '../../../common/enums/role.enum';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ListOfferQueryDto } from '../../offers/models/dto/req/list-offer-query.dto';
import { ListOfferResDto } from '../../offers/models/dto/res/list-offer.res.dto';
import { ListUserQueryDto } from '../models/dto/req/list-user-query.dto';
import { ListUserResDto } from '../models/dto/res/list-user.res.dto';
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
      isActive: user.isActive,
    };
  }

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUserQueryDto,
  ): ListUserResDto {
    return {
      data: data.map((user) => this.toResDto(user)),
      total,
      ...query,
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
