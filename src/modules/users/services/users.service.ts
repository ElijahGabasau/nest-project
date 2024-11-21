import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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
