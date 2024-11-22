import { UserEntity } from '../../../database/entities/user.entity';
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
}
