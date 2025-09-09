import { Repository } from 'typeorm';
import { Consultation } from '@/entities/consultation.entity';
import { ConsultationType, ConsultationStatus } from '@/common/interfaces';
export declare class ConsultationsService {
    private consultationRepository;
    constructor(consultationRepository: Repository<Consultation>);
    findAll(): Promise<Consultation[]>;
    findOne(id: number): Promise<Consultation | null>;
    findByPetId(petId: number): Promise<Consultation[]>;
    findByVetId(vetId: number): Promise<Consultation[]>;
    findByStatus(status: ConsultationStatus): Promise<Consultation[]>;
    findByType(type: ConsultationType): Promise<Consultation[]>;
    getUpcomingConsultations(days?: number): Promise<Consultation[]>;
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
    create(createConsultationDto: any): Promise<Consultation>;
    update(id: number, updateConsultationDto: any): Promise<Consultation>;
    updateStatus(id: number, status: ConsultationStatus): Promise<Consultation>;
    remove(id: number): Promise<void>;
}
