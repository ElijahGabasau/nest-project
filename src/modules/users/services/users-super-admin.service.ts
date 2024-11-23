import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEnum } from '../../../common/enums/role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { TokensHelper } from '../../auth/helpers/tokens.helper';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserAdminBaseReqDto } from '../models/dto/req/user-admin-base.req.dto';
import { AccountEnum } from '../models/enums/account.enum';

@Injectable()
export class UsersSuperAdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async createSuperAdmin(dto: UserAdminBaseReqDto): Promise<UserEntity> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.SUPER_ADMIN,
        account: AccountEnum.PREMIUM,
      }),
    );
  }

  public async createManager(dto: UserAdminBaseReqDto): Promise<UserEntity> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.ADMIN,
        account: AccountEnum.PREMIUM,
      }),
    );
  }

  public async deleteOne(userId: UserID): Promise<void> {
    await Promise.all([
      this.userRepository.update({ id: userId }, { isDeleted: true }),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userId,
      ),
    ]);
  }

  // todo by role
  public async findByRole() {
    return 'found by role';
  }

  private async isEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exist');
    }
  }
}
