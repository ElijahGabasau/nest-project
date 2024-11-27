import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import { CurrencyService } from '../offers/services/currency.service';

@Injectable()
export class TasksService {
  constructor(private readonly currencyService: CurrencyService) {}

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

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log('here is cron check');
    this.getCurrency();
  }
}
