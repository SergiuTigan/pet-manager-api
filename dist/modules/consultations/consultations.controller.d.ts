import { ConsultationsService } from './consultations.service';
import { ConsultationType, ConsultationStatus } from '@/common/interfaces';
export declare class ConsultationsController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    findAll(petId?: string, vetId?: string, status?: ConsultationStatus, type?: ConsultationType): Promise<import("../../entities").Consultation[]>;
    getUpcomingConsultations(days?: string): Promise<import("../../entities").Consultation[]>;
    getStatistics(): Promise<{
        total: number;
        by_status: Record<string, number>;
        by_type: Record<string, number>;
        upcoming_this_week: number;
        financial: {
            total_revenue: number;
            pending_payments: number;
            paid_consultations: number;
        };
        completion_rate: number;
    }>;
    findOne(id: number): Promise<import("../../entities").Consultation>;
    create(createConsultationDto: any): Promise<import("../../entities").Consultation>;
    update(id: number, updateConsultationDto: any): Promise<import("../../entities").Consultation>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, status: ConsultationStatus): Promise<import("../../entities").Consultation>;
}
