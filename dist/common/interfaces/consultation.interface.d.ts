export declare enum ConsultationType {
    CONTROL_RUTINA = "control_rutina",
    URGENTA = "urgenta",
    VACCINARE = "vaccinare",
    CHIRURGIE = "chirurgie"
}
export declare enum ConsultationStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
}
export interface Consultation {
    id: number;
    pet_id: number;
    vet_id: number;
    appointment_date: string;
    consultation_type: ConsultationType;
    reason: string;
    symptoms: string[];
    diagnosis: string;
    treatment: string;
    medications: Medication[];
    recommendations: string[];
    next_appointment?: string | null;
    weight: number;
    temperature: number;
    heart_rate: number;
    status: ConsultationStatus;
    notes: string;
    invoice_amount: number;
    invoice_paid: boolean;
    created_at: string;
    updated_at: string;
}
