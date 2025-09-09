import { UserType } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { Consultation } from './consultation.entity';
import { Vaccination } from './vaccination.entity';
import { Notification } from './notification.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    phone: string;
    password: string;
    type: UserType;
    avatar: string;
    created_at: Date;
    last_login: Date;
    preferences: {
        notifications: {
            email: boolean;
            push: boolean;
            reminders: boolean;
        };
        language: string;
    };
    clinic_name: string;
    clinic_address: string;
    license_number: string;
    specializations: string[];
    working_hours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    pets: Pet[];
    consultations_as_vet: Consultation[];
    vaccinations_administered: Vaccination[];
    notifications: Notification[];
}
