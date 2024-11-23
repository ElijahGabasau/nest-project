import { ForbiddenException, Injectable } from '@nestjs/common';

import { RoleEnum } from '../../../common/enums/role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { TokensHelper } from '../../auth/helpers/tokens.helper';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UsersAdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  //todo not sure if this is needed
  // public async findAll() {
  //   return 'found all';
  // }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  //only users
  public async ban(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      role: RoleEnum.USER,
    });
    if (!user) {
      throw new ForbiddenException('You can only ban users');
    }
    await Promise.all([
      this.userRepository.update(
        { id: userId, role: RoleEnum.USER },
        { isDeleted: true },
      ),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userId,
      ),
    ]);
  }
}
