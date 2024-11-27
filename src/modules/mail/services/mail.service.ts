import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMessageAboutAddingCarBrand(brand: string) {
    const url = `http://localhost:3000/docs#/offers/OffersController_addCarBrand`;
    await this.mailerService.sendMail({
      to: 'varenaska@gmail.com', //admins email
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
    await this.mailerService.sendMail({
      to: 'varenaska@gmail.com', //admins email
      subject: 'Offer is waiting for checking',
      template: 'check-user-offer',
      context: {
        offerId,
        url,
      },
    });
  }
}
