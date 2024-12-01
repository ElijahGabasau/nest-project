import { ListOfferQueryDto } from '../req/list-offer-query.dto';
import { ShortOfferResDto } from './short-offer.res.dto';
export declare class ListOfferResDto extends ListOfferQueryDto {
    data: ShortOfferResDto[];
    total: number;
}
