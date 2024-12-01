"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyConverterHelper = void 0;
const currency_enum_1 = require("../models/enums/currency.enum");
class CurrencyConverterHelper {
    static async convertInUAH(currency, amount, currencyService) {
        if (currency === currency_enum_1.CurrencyEnum.UAH) {
            return amount;
        }
        const currencyRate = await currencyService.getCurrency(currency);
        return Math.round(amount * currencyRate);
    }
}
exports.CurrencyConverterHelper = CurrencyConverterHelper;
//# sourceMappingURL=currency-converter.helper.js.map