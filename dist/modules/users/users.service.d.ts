import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Pet } from '@/entities/pet.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Notification } from '@/entities/notification.entity';
import { UserType } from '@/common/interfaces';
export declare class UsersService {
    private userRepository;
    private petRepository;
    private consultationRepository;
    private vaccinationRepository;
    private notificationRepository;
    constructor(userRepository: Repository<User>, petRepository: Repository<Pet>, consultationRepository: Repository<Consultation>, vaccinationRepository: Repository<Vaccination>, notificationRepository: Repository<Notification>);
    findAll(): Promise<Omit<User, 'preferences'>[]>;
    findOne(id: number): Promise<Omit<User, 'preferences'> | null>;
    findByEmail(email: string): Promise<Omit<User, 'preferences'> | null>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    findByType(type: UserType): Promise<Omit<User, 'preferences'>[]>;
    searchUsers(query: string): Promise<Omit<User, 'preferences'>[]>;
    getUserPets(userId: number): Promise<any>;
    getUserNotifications(userId: number): Promise<any>;
    getUnreadNotifications(userId: number): Promise<any>;
    getDashboardData(userId: number): Promise<{
        user: Omit<User, "preferences">;
        pets_count: any;
        active_pets: any;
        unread_notifications: any;
        upcoming_consultations: any;
        recent_consultations: any;
        pets: any;
        urgent_notifications: any;
    }>;
    getVetConsultations(vetId: number, status?: string): Promise<any>;
    getVetVaccinations(vetId: number): Promise<any>;
    getStatistics(): Promise<{
        total_users: any;
        owners: {
            count: any;
            with_multiple_pets: number;
        };
        veterinarians: {
            count: any;
            specializations: any;
            with_working_hours: any;
        };
        activity: {
            recent_logins: any;
            active_percentage: number;
        };
    }>;
    private sanitizeUser;
    findOneWithPreferences(id: number): Promise<User | null>;
    private getOwnersWithMultiplePets;
    create(createUserDto: any): Promise<User>;
    update(id: number, updateUserDto: any): Promise<User>;
    remove(id: number): Promise<void>;
}
