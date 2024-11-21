import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersAdminService {
  public async findMe() {
    return 'found me';
  }

  public async findAll() {
    return 'found all';
  }

  public async findOne() {
    return 'found one';
  }

  public async deleteOne() {
    return 'deleted one';
  }
}
