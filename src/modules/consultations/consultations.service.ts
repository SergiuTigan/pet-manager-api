import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from '@/entities/consultation.entity';
import { ConsultationType, ConsultationStatus } from '@/common/interfaces';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
  ) {}

  async findAll(): Promise<Consultation[]> {
    return this.consultationRepository.find({
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Consultation | null> {
    return this.consultationRepository.findOne({
      where: { id },
      relations: ['pet', 'veterinarian'],
    });
  }

  async findByPetId(petId: number): Promise<Consultation[]> {
    return this.consultationRepository.find({
      where: { pet_id: petId },
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async findByVetId(vetId: number): Promise<Consultation[]> {
    return this.consultationRepository.find({
      where: { vet_id: vetId },
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async findByStatus(status: ConsultationStatus): Promise<Consultation[]> {
    return this.consultationRepository.find({
      where: { status },
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async findByType(type: ConsultationType): Promise<Consultation[]> {
    return this.consultationRepository.find({
      where: { consultation_type: type },
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async getUpcomingConsultations(days: number = 7): Promise<Consultation[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return this.consultationRepository
      .createQueryBuilder('consultation')
      .leftJoinAndSelect('consultation.pet', 'pet')
      .leftJoinAndSelect('consultation.veterinarian', 'veterinarian')
      .where('consultation.appointment_date >= :today', { today })
      .andWhere('consultation.appointment_date <= :futureDate', { futureDate })
      .andWhere('consultation.status IN (:...statuses)', { 
        statuses: [ConsultationStatus.SCHEDULED, ConsultationStatus.IN_PROGRESS] 
      })
      .orderBy('consultation.appointment_date', 'ASC')
      .getMany();
  }

  async getStatistics() {
    const consultations = await this.findAll();
    
    const statusBreakdown = consultations.reduce((acc, consultation) => {
      acc[consultation.status] = (acc[consultation.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeBreakdown = consultations.reduce((acc, consultation) => {
      acc[consultation.consultation_type] = (acc[consultation.consultation_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalRevenue = consultations
      .filter(c => c.invoice_paid)
      .reduce((sum, c) => sum + Number(c.invoice_amount), 0);

    const pendingPayments = consultations
      .filter(c => !c.invoice_paid && c.invoice_amount > 0)
      .reduce((sum, c) => sum + Number(c.invoice_amount), 0);

    const upcomingCount = (await this.getUpcomingConsultations(7)).length;

    return {
      total: consultations.length,
      by_status: statusBreakdown,
      by_type: typeBreakdown,
      upcoming_this_week: upcomingCount,
      financial: {
        total_revenue: totalRevenue,
        pending_payments: pendingPayments,
        paid_consultations: consultations.filter(c => c.invoice_paid).length,
      },
      completion_rate: Math.round((statusBreakdown.completed / consultations.length) * 100) || 0,
    };
  }

  async create(createConsultationDto: any): Promise<Consultation> {
    const consultation = this.consultationRepository.create(createConsultationDto);
    return (await this.consultationRepository.save(consultation)) as unknown as Consultation;
  }

  async update(id: number, updateConsultationDto: any): Promise<Consultation> {
    await this.consultationRepository.update(id, updateConsultationDto);
    return this.findOne(id);
  }

  async updateStatus(id: number, status: ConsultationStatus): Promise<Consultation> {
    await this.consultationRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.consultationRepository.delete(id);
  }
}