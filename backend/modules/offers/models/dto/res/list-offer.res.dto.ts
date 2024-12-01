import { ListOfferQueryDto } from '../req/list-offer-query.dto';
import { ShortOfferResDto } from './short-offer.res.dto';

export class ListOfferResDto extends ListOfferQueryDto {
  data: ShortOfferResDto[];
  total: number;
}
