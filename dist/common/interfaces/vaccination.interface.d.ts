export declare enum VaccineType {
    ANTIRABIC = "antirabic",
    DEPARAZITARE = "deparazitare",
    POLIVALENT = "polivalent",
    TRIVALENT = "trivalent",
    MIXOMATOZA = "mixomatoza"
}
export declare enum VaccinationStatus {
    VALID = "valid",
    DUE_SOON = "due_soon",
    EXPIRED = "expired"
}
export interface Vaccination {
    id: number;
    pet_id: number;
    vaccine_name: string;
    vaccine_type: VaccineType;
    manufacturer: string;
    batch_number: string;
    date_administered: string;
    next_due_date: string;
    administered_by_vet_id: number;
    clinic_name: string;
    certificate_number?: string | null;
    dose: string;
    site_of_injection: string;
    reaction: string;
    notes: string;
    status: VaccinationStatus;
    created_at: string;
}
