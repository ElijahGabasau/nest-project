import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  public async findMe() {
    return 'found me';
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
