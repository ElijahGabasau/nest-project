import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
  public async get() {
    return 'This action returns a user';
  }
}
