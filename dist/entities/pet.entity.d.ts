import { PetSpecies, PetGender } from '@/common/interfaces';
import { User } from './user.entity';
import { Vaccination } from './vaccination.entity';
import { Consultation } from './consultation.entity';
import { Document } from './document.entity';
import { FeedingSchedule } from './feeding-schedule.entity';
export declare class Pet {
    id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    birth_date: Date;
    weight: number;
    microchip: string;
    color: string;
    photo_url: string;
    is_neutered: boolean;
    is_active: boolean;
    created_at: Date;
    medical_conditions: string[];
    allergies: string[];
    notes: string;
    emergency_contact: {
        name: string;
        phone: string;
        relationship: string;
    };
    insurance: {
        provider: string;
        policy_number: string;
        valid_until: string;
    };
    owner: User;
    owner_id: number;
    vaccinations: Vaccination[];
    consultations: Consultation[];
    documents: Document[];
    feeding_schedules: FeedingSchedule[];
}
