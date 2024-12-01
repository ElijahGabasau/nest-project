import { CurrencyEnum } from '../../enums/currency.enum';
export declare class OfferBaseReqDto {
    title: string;
    description: string;
    brand: string;
    model: string;
    year?: number;
    price: number;
    currency: CurrencyEnum;
    city?: string;
    region?: string;
}
