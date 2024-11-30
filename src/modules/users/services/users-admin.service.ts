import { ForbiddenException, Injectable } from '@nestjs/common';

import { RoleEnum } from '../../../common/enums/role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { TokensHelper } from '../../auth/helpers/tokens.helper';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { ListOfferQueryDto } from '../../offers/models/dto/req/list-offer-query.dto';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ListUserQueryDto } from '../models/dto/req/list-user-query.dto';

@Injectable()
export class UsersAdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findAll(
    query: ListUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAll(query);
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async ban(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      role: RoleEnum.USER || RoleEnum.GUEST,
    });
    if (!user) {
      throw new ForbiddenException('You can only ban users');
    }
    await Promise.all([
      this.userRepository.update(
        { id: userId, role: RoleEnum.USER },
        { isActive: false },
      ),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userId,
      ),
    ]);
  }

  public async restoreUser(userId: UserID): Promise<void> {
    await this.userRepository.update(
      { id: userId, role: RoleEnum.USER },
      { isActive: true },
    );
  }
}
