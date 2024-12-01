import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../../repository/services/user.repository';
export declare class MailService {
    private mailerService;
    private readonly userRepository;
    constructor(mailerService: MailerService, userRepository: UserRepository);
    sendMessageAboutAddingCarBrand(brand: string): Promise<void>;
    sendMessageAboutCheckingPost(offerId: string): Promise<void>;
}
