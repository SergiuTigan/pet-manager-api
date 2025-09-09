import { Repository } from 'typeorm';
import { Vaccination } from '@/entities/vaccination.entity';
import { VaccinationStatus, VaccineType } from '@/common/interfaces';
export declare class VaccinationsService {
    private vaccinationRepository;
    constructor(vaccinationRepository: Repository<Vaccination>);
    findAll(): Promise<Vaccination[]>;
    findOne(id: number): Promise<Vaccination | null>;
    findByPetId(petId: number): Promise<Vaccination[]>;
    findByVetId(vetId: number): Promise<Vaccination[]>;
    findByStatus(status: VaccinationStatus): Promise<Vaccination[]>;
    findByType(type: VaccineType): Promise<Vaccination[]>;
    getVaccinationsDueSoon(days?: number): Promise<Vaccination[]>;
    getCertificate(vaccinationId: number): Promise<{
        vaccination_id: number;
        certificate_number: string;
        pet_id: number;
        vaccine_name: string;
        date_administered: Date;
        administered_by: string;
        batch_number: string;
        valid_until: Date;
        generated_at: string;
    }>;
    getStatistics(): Promise<{
        total: number;
        by_status: Record<string, number>;
        by_type: Record<string, number>;
        by_manufacturer: Record<string, number>;
        due_soon: {
            next_30_days: number;
            next_7_days: number;
        };
        coverage_percentage: number;
        certificates_issued: number;
    }>;
    create(createVaccinationDto: any): Promise<Vaccination>;
    update(id: number, updateVaccinationDto: any): Promise<Vaccination>;
    remove(id: number): Promise<void>;
}
