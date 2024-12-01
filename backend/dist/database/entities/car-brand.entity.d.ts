import { CarBrandID } from '../../common/types/entity-ids.type';
import { OfferEntity } from './offer.entity';
export declare class CarBrandEntity {
    id: CarBrandID;
    brand: string;
    offer?: OfferEntity;
}
