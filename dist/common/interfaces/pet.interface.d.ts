export declare enum PetSpecies {
    DOG = "C\u00E2ine",
    CAT = "Pisic\u0103",
    RABBIT = "Iepure",
    BIRD = "Pas\u0103re",
    OTHER = "Altele"
}
export declare enum PetGender {
    MALE = "Masculin",
    FEMALE = "Feminin"
}
export interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
}
export interface Insurance {
    provider: string;
    policy_number: string;
    valid_until: string;
}
export interface Pet {
    id: number;
    owner_id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    birth_date: string;
    weight: number;
    microchip: string;
    color: string;
    photo_url?: string;
    is_neutered: boolean;
    is_active: boolean;
    created_at: string;
    medical_conditions: string[];
    allergies: string[];
    notes: string;
    emergency_contact: EmergencyContact;
    insurance?: Insurance | null;
}
