import { OfferID, ViewID } from '../../common/types/entity-ids.type';
import { OfferEntity } from './offer.entity';
export declare class ViewEntity {
    id: ViewID;
    created: Date;
    offer_id: OfferID;
    offer?: OfferEntity;
}
