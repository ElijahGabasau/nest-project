import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { TokensHelper } from '../../auth/helpers/tokens.helper';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { AccountEnum } from '../models/enums/account.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}

  public async me(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    user.name = dto.name;
    user.phone = dto.phone;
    return await this.userRepository.save(user);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await Promise.all([
      this.userRepository.update({ id: userData.userId }, { isDeleted: true }),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userData.userId,
      ),
    ]);
  }

  public async updateAccount(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { account: AccountEnum.PREMIUM },
    );
  }
}
