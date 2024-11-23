import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UpdateUserAccountReqDto } from './models/dto/req/update-user-account.req.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //user
  @Get('me')
  public async me(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.me(userData);
    return UserMapper.toResDto(result);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: any,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    await this.usersService.updateMe();
  }

  @Delete('me')
  public async deleteMe() {
    await this.usersService.deleteMe();
  }

  @Patch('account')
  public async updateAccount(@Body() updateUserDto: UpdateUserAccountReqDto) {
    await this.usersService.updateAccount();
  }
}
