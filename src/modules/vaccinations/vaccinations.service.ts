import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccination } from '@/entities/vaccination.entity';
import { VaccinationStatus, VaccineType } from '@/common/interfaces';

@Injectable()
export class VaccinationsService {
  constructor(
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
  ) {}

  async findAll(): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      relations: ['pet', 'administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Vaccination | null> {
    return this.vaccinationRepository.findOne({
      where: { id },
      relations: ['pet', 'administered_by_vet'],
    });
  }

  async findByPetId(petId: number): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      where: { pet_id: petId },
      relations: ['pet', 'administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async findByVetId(vetId: number): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      where: { administered_by_vet_id: vetId },
      relations: ['pet', 'administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async findByStatus(status: VaccinationStatus): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      where: { status },
      relations: ['pet', 'administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async findByType(type: VaccineType): Promise<Vaccination[]> {
    return this.vaccinationRepository.find({
      where: { vaccine_type: type },
      relations: ['pet', 'administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async getVaccinationsDueSoon(days: number = 30): Promise<Vaccination[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return this.vaccinationRepository
      .createQueryBuilder('vaccination')
      .leftJoinAndSelect('vaccination.pet', 'pet')
      .leftJoinAndSelect('vaccination.administered_by_vet', 'vet')
      .where('vaccination.next_due_date >= :today', { today })
      .andWhere('vaccination.next_due_date <= :futureDate', { futureDate })
      .orderBy('vaccination.next_due_date', 'ASC')
      .getMany();
  }

  async getCertificate(vaccinationId: number) {
    const vaccination = await this.findOne(vaccinationId);
    if (!vaccination || !vaccination.certificate_number) {
      return null;
    }

    return {
      vaccination_id: vaccination.id,
      certificate_number: vaccination.certificate_number,
      pet_id: vaccination.pet_id,
      vaccine_name: vaccination.vaccine_name,
      date_administered: vaccination.date_administered,
      administered_by: vaccination.clinic_name,
      batch_number: vaccination.batch_number,
      valid_until: vaccination.next_due_date,
      generated_at: new Date().toISOString(),
    };
  }

  async getStatistics() {
    const vaccinations = await this.findAll();
    
    const statusBreakdown = vaccinations.reduce((acc, vaccination) => {
      acc[vaccination.status] = (acc[vaccination.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeBreakdown = vaccinations.reduce((acc, vaccination) => {
      acc[vaccination.vaccine_type] = (acc[vaccination.vaccine_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const manufacturerBreakdown = vaccinations.reduce((acc, vaccination) => {
      const manufacturer = vaccination.manufacturer.split(' ')[0]; // Get first word
      acc[manufacturer] = (acc[manufacturer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dueSoonCount = (await this.getVaccinationsDueSoon(30)).length;
    const dueSoonUrgent = (await this.getVaccinationsDueSoon(7)).length;

    return {
      total: vaccinations.length,
      by_status: statusBreakdown,
      by_type: typeBreakdown,
      by_manufacturer: manufacturerBreakdown,
      due_soon: {
        next_30_days: dueSoonCount,
        next_7_days: dueSoonUrgent,
      },
      coverage_percentage: Math.round((statusBreakdown.valid / vaccinations.length) * 100),
      certificates_issued: vaccinations.filter(v => v.certificate_number).length,
    };
  }

  async create(createVaccinationDto: any): Promise<Vaccination> {
    const vaccination = this.vaccinationRepository.create(createVaccinationDto);
    return (await this.vaccinationRepository.save(vaccination)) as unknown as Vaccination;
  }

  async update(id: number, updateVaccinationDto: any): Promise<Vaccination> {
    await this.vaccinationRepository.update(id, updateVaccinationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vaccinationRepository.delete(id);
  }
}