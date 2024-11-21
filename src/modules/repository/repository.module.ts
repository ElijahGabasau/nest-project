import { Global, Module } from '@nestjs/common';

import { CarShowroomRepository } from './services/car-showroom.repository';
import { MechanicRepository } from './services/mechanic.repository';
import { OfferRepository } from './services/offer.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  OfferRepository,
  MechanicRepository,
  CarShowroomRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
