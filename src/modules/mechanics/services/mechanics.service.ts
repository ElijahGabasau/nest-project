import { Injectable } from '@nestjs/common';

@Injectable()
export class MechanicsService {
  public async create() {
    return 'This action adds a new user';
  }
}
