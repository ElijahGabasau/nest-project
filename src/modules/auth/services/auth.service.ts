import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEnum } from '../../../common/enums/role.enum';
import { RolePermissions } from '../../accessControl/role-permissions';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/services/user.mapper';
import { TokensHelper } from '../helpers/tokens.helper';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token-service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailExist(dto.email);
    const permissions = RolePermissions[RoleEnum.USER];
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        permissions,
      }),
    );
    const tokens = await TokensHelper.generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      user.id,
    );
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    await this.isUserNotDeleted(dto.email);
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or user did not register');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const tokens = await TokensHelper.generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      user.id,
    );
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async signOut(userData: IUserData): Promise<void> {
    await TokensHelper.deleteTokens(
      this.authCacheService,
      this.refreshTokenRepository,
      userData.userId,
    );
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await TokensHelper.deleteTokens(
      this.authCacheService,
      this.refreshTokenRepository,
      userData.userId,
    );
    const tokens = await TokensHelper.generateAndSaveTokens(
      this.tokenService,
      this.authCacheService,
      this.refreshTokenRepository,
      userData.userId,
    );
    return tokens;
  }

  private async isEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exist');
    }
  }
  private async isUserNotDeleted(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
      isDeleted: true,
    });
    if (user) {
      throw new ConflictException('Your account is deleted ot banned');
    }
  }
}
