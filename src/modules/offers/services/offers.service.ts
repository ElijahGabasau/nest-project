import { Injectable } from '@nestjs/common';

@Injectable()
export class OffersService {
  public async getAll() {
    return 'This action returns all offers';
  }

  public async create() {
    return 'This action adds a new offer';
  }

  public async update() {
    return 'This action updates a offer';
  }

  public async getById() {
    return 'This action returns a offer';
  }

  public async getMyOffers() {
    return 'This action returns my offers';
  }

  public async deleteMy() {
    return 'This action deletes my offer';
  }

  public async activate() {
    return 'This action activates a offer';
  }

  public async deactivate() {
    return 'This action deactivates a offer';
  }
}
