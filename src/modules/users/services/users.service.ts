import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public async create() {
    return 'This action adds a new user';
  }
}
