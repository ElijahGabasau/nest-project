import { CurrencyEnum } from '../models/enums/currency.enum';
import { CurrencyService } from '../services/currency.service';
export declare class CurrencyConverterHelper {
    static convertInUAH(currency: CurrencyEnum, amount: number, currencyService: CurrencyService): Promise<number>;
}
