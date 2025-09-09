import { ConsultationType, ConsultationStatus } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';
export declare class Consultation {
    id: number;
    appointment_date: Date;
    consultation_type: ConsultationType;
    reason: string;
    symptoms: string[];
    diagnosis: string;
    treatment: string;
    medications: Array<{
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
        instructions: string;
    }>;
    recommendations: string[];
    next_appointment: Date;
    weight: number;
    temperature: number;
    heart_rate: number;
    status: ConsultationStatus;
    notes: string;
    invoice_amount: number;
    invoice_paid: boolean;
    created_at: Date;
    updated_at: Date;
    pet: Pet;
    pet_id: number;
    veterinarian: User;
    vet_id: number;
}
