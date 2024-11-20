import { Injectable } from '@nestjs/common';

@Injectable()
export class OffersService {
  public async create() {
    return 'This action adds a new user';
  }
}
