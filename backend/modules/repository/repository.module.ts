import { Global, Module } from '@nestjs/common';

import { CarBrandRepository } from './services/car-brand.repository';
import { CarShowroomRepository } from './services/car-showroom.repository';
import { MechanicRepository } from './services/mechanic.repository';
import { OfferRepository } from './services/offer.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { ViewRepository } from './services/view.repository';

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  OfferRepository,
  MechanicRepository,
  CarShowroomRepository,
  ViewRepository,
  CarBrandRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
