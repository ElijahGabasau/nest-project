import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
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
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
