import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import { CurrencyService } from '../offers/services/currency.service';
import { OfferRepository } from '../repository/services/offer.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly offerRepository: OfferRepository,
  ) {}

  private readonly logger = new Logger(TasksService.name);
  private axiosInstance = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
  });
  getCurrency = async () => {
    try {
      const { data } = await this.axiosInstance.get(
        this.axiosInstance.defaults.baseURL,
      );
      for (const item of data) {
        await this.currencyService.saveCurrency(item.ccy, item.sale);
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  updateCurrency = async () => {
    try {
      const offers = await this.offerRepository.find();
      for (const offer of offers) {
        const currency = await this.currencyService.getCurrency(offer.currency);
        const newPrice = offer.price * currency;
        await this.offerRepository.update(offer.id, {
          priceInUAH: newPrice,
          currencyRate: currency,
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log('here is cron check');
    this.getCurrency();
    this.updateCurrency();
  }
}
