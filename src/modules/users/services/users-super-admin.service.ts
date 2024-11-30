import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { In } from 'typeorm';

import { RoleEnum } from '../../../common/enums/role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { RolePermissions } from '../../accessControl/role-permissions';
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
    const permissions = RolePermissions[RoleEnum.SUPER_ADMIN];
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.SUPER_ADMIN,
        account: AccountEnum.PREMIUM,
        permissions,
      }),
    );
  }

  public async createSuperAdminShowroom(
    dto: UserAdminBaseReqDto,
  ): Promise<UserEntity> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const permissions = RolePermissions[RoleEnum.SHOWROOM_SUPER_ADMIN];
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.SHOWROOM_SUPER_ADMIN,
        account: AccountEnum.PREMIUM,
        permissions,
      }),
    );
  }

  public async createAdmin(dto: UserAdminBaseReqDto): Promise<UserEntity> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const permissions = RolePermissions[RoleEnum.ADMIN];
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.ADMIN,
        account: AccountEnum.PREMIUM,
        permissions,
      }),
    );
  }

  public async createAdminShowroom(
    dto: UserAdminBaseReqDto,
  ): Promise<UserEntity> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const permissions = RolePermissions[RoleEnum.SHOWROOM_ADMIN];
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role: RoleEnum.SHOWROOM_ADMIN,
        account: AccountEnum.PREMIUM,
        permissions,
      }),
    );
  }

  public async deleteOne(userId: UserID): Promise<void> {
    await Promise.all([
      this.userRepository.update(
        { id: userId, role: In([RoleEnum.USER, RoleEnum.ADMIN]) },
        { isActive: false },
      ),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userId,
      ),
    ]);
  }

  public async deleteOneS(userId: UserID): Promise<void> {
    await Promise.all([
      this.userRepository.update(
        { id: userId, role: RoleEnum.SHOWROOM_ADMIN },
        { isActive: false },
      ),
      TokensHelper.deleteTokens(
        this.authCacheService,
        this.refreshTokenRepository,
        userId,
      ),
    ]);
  }

  public async findByRole(role: RoleEnum): Promise<UserEntity[]> {
    if (!Object.values(RoleEnum).includes(role)) {
      throw new BadRequestException('Invalid role');
    }
    return await this.userRepository.findBy({ role });
  }

  private async isEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exist');
    }
  }
}
