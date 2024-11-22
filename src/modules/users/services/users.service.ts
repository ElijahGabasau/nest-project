import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  public async me(userData: IUserData) {
    return `found me: ${userData.role}`;
  }

  public async updateMe() {
    return 'updated me';
  }

  public async deleteMe() {
    return 'deleted me';
  }

  public async updateAccount() {
    return 'updated account';
  }
}
