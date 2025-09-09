import { VaccineType, VaccinationStatus } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';
export declare class Vaccination {
    id: number;
    vaccine_name: string;
    vaccine_type: VaccineType;
    manufacturer: string;
    batch_number: string;
    date_administered: Date;
    next_due_date: Date;
    clinic_name: string;
    certificate_number: string;
    dose: string;
    site_of_injection: string;
    reaction: string;
    notes: string;
    status: VaccinationStatus;
    created_at: Date;
    pet: Pet;
    pet_id: number;
    administered_by_vet: User;
    administered_by_vet_id: number;
}
