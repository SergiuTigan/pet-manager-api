import { Repository } from 'typeorm';
import { User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification } from '../entities';
export declare class SeederService {
    private userRepository;
    private petRepository;
    private vaccinationRepository;
    private consultationRepository;
    private documentRepository;
    private feedingScheduleRepository;
    private notificationRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, petRepository: Repository<Pet>, vaccinationRepository: Repository<Vaccination>, consultationRepository: Repository<Consultation>, documentRepository: Repository<Document>, feedingScheduleRepository: Repository<FeedingSchedule>, notificationRepository: Repository<Notification>);
    seedDatabase(): Promise<void>;
    clearDatabase(): Promise<void>;
}
