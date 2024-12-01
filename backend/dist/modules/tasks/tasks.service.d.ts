import { CurrencyService } from '../offers/services/currency.service';
import { OfferRepository } from '../repository/services/offer.repository';
export declare class TasksService {
    private readonly currencyService;
    private readonly offerRepository;
    constructor(currencyService: CurrencyService, offerRepository: OfferRepository);
    private readonly logger;
    private axiosInstance;
    getCurrency: () => Promise<void>;
    updateCurrency: () => Promise<void>;
    handleCron(): void;
}
