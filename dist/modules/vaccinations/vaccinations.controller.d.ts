import { VaccinationsService } from './vaccinations.service';
import { VaccinationStatus, VaccineType } from '@/common/interfaces';
export declare class VaccinationsController {
    private readonly vaccinationsService;
    constructor(vaccinationsService: VaccinationsService);
    findAll(petId?: string, vetId?: string, status?: VaccinationStatus, type?: VaccineType): Promise<import("../../entities").Vaccination[]>;
    getVaccinationsDueSoon(days?: string): Promise<import("../../entities").Vaccination[]>;
    getExpiredVaccinations(): Promise<import("../../entities").Vaccination[]>;
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
    findOne(id: number): Promise<import("../../entities").Vaccination>;
    getCertificate(id: number): Promise<{
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
    create(createVaccinationDto: any): Promise<import("../../entities").Vaccination>;
    update(id: number, updateVaccinationDto: any): Promise<import("../../entities").Vaccination>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
