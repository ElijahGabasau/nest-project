import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  //user
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

  //manager
  public async findAll() {
    return 'found all';
  }

  public async findOne() {
    return 'found one';
  }

  public async deleteOne() {
    return 'deleted one';
  }

  //admin
  public async makeManager() {
    return 'made manager';
  }

  public async findByRole() {
    return 'found by role';
  }
}
