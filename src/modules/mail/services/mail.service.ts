import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { RoleEnum } from '../../../common/enums/role.enum';
import { UserRepository } from '../../repository/services/user.repository';
//todo change my email to admin email
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly userRepository: UserRepository,
  ) {}

  async sendMessageAboutAddingCarBrand(brand: string) {
    const url = `http://localhost:3000/docs#/offers/OffersController_addCarBrand`;
    const admins = await this.userRepository.findBy({ role: RoleEnum.ADMIN });
    const adminsEmails = admins.map((admin) => admin.email);
    await this.mailerService.sendMail({
      to: 'varenaska@gmail.com',
      // to: adminsEmails, (origin code)
      subject: 'Car brand is missing. Please add it.',
      template: 'car-brand',
      context: {
        brand,
        url,
      },
    });
  }

  async sendMessageAboutCheckingPost(offerId: string) {
    const url = `http://localhost:3000/docs#/offers/OffersController_get`;
    const admins = await this.userRepository.findBy({ role: RoleEnum.ADMIN });
    const adminsEmails = admins.map((admin) => admin.email);
    await this.mailerService.sendMail({
      to: 'varenaska@gmail.com',
      // to: adminsEmails, (origin code)
      subject: 'Offer is waiting for checking',
      template: 'check-user-offer',
      context: {
        offerId,
        url,
      },
    });
  }
}
