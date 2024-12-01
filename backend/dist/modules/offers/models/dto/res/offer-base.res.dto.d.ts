import { OfferID } from '../../../../../common/types/entity-ids.type';
import { CurrencyEnum } from '../../enums/currency.enum';
import { StatusEnum } from '../../enums/status.enum';
export declare class OfferBaseResDto {
    id: OfferID;
    title: string;
    description: string;
    brand: string;
    model: string;
    year?: number;
    priceInUAH: number;
    price: number;
    currency: CurrencyEnum;
    currencyRate: number;
    city: string;
    region: string;
    image?: string;
    status: StatusEnum;
}
