import { PetSpecies, PetGender } from '../interfaces/pet.interface';
import { EmergencyContactDto } from './emergency-contact.dto';
export declare class CreatePetDto {
    owner_id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    birth_date?: string;
    weight?: number;
    microchip?: string;
    color?: string;
    photo_url?: string;
    is_neutered?: boolean;
    medical_conditions?: string[];
    allergies?: string[];
    notes?: string;
    emergency_contact: EmergencyContactDto;
}
