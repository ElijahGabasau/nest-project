import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersSuperAdminService {
  public async findMe() {
    return 'found me';
  }
  public async deleteOne() {
    return 'deleted one';
  }

  public async makeManager() {
    return 'made manager';
  }

  public async findByRole() {
    return 'found by role';
  }
}
