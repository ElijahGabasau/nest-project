import { DataSource, Repository } from 'typeorm';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { ListOfferQueryDto } from '../../offers/models/dto/req/list-offer-query.dto';
export declare class OfferRepository extends Repository<OfferEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: ListOfferQueryDto): Promise<[OfferEntity[], number]>;
}
