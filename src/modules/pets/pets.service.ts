import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Pet } from '@/entities/pet.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Document } from '@/entities/document.entity';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';
import { CreatePetDto } from '@/common/dto';
import { PetSpecies } from '@/common/interfaces';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(FeedingSchedule)
    private feedingScheduleRepository: Repository<FeedingSchedule>,
  ) {}

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({
      relations: ['owner'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Pet | null> {
    return this.petRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async findByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.petRepository.find({
      where: { owner_id: ownerId },
      relations: ['owner'],
      order: { created_at: 'DESC' },
    });
  }

  async findBySpecies(species: PetSpecies): Promise<Pet[]> {
    return this.petRepository.find({
      where: { species },
      relations: ['owner'],
      order: { created_at: 'DESC' },
    });
  }

  async searchPets(query: string): Promise<Pet[]> {
    return this.petRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        { breed: Like(`%${query}%`) },
        { microchip: Like(`%${query}%`) },
      ],
      relations: ['owner'],
      order: { created_at: 'DESC' },
    });
  }

  async getPetVaccinations(petId: number) {
    return this.vaccinationRepository.find({
      where: { pet_id: petId },
      relations: ['administered_by_vet'],
      order: { date_administered: 'DESC' },
    });
  }

  async getPetConsultations(petId: number) {
    return this.consultationRepository.find({
      where: { pet_id: petId },
      relations: ['veterinarian'],
      order: { appointment_date: 'DESC' },
    });
  }

  async getPetDocuments(petId: number) {
    return this.documentRepository.find({
      where: { pet_id: petId },
      relations: ['uploaded_by_user'],
      order: { created_at: 'DESC' },
    });
  }

  async getPetFeedingSchedule(petId: number) {
    return this.feedingScheduleRepository.findOne({
      where: { pet_id: petId },
      order: { created_at: 'DESC' },
    });
  }

  async getHealthSummary(petId: number) {
    const pet = await this.findOne(petId);
    if (!pet) return null;

    const vaccinations = await this.getPetVaccinations(petId);
    const consultations = await this.getPetConsultations(petId);
    const documents = await this.getPetDocuments(petId);
    const feedingSchedule = await this.getPetFeedingSchedule(petId);

    const vaccinationStatus = {
      total: vaccinations.length,
      valid: vaccinations.filter(v => v.status === 'valid').length,
      due_soon: vaccinations.filter(v => v.status === 'due_soon').length,
      expired: vaccinations.filter(v => v.status === 'expired').length,
    };

    const lastConsultation = consultations
      .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())[0];

    const upcomingVaccinations = vaccinations
      .filter(v => v.status === 'due_soon')
      .sort((a, b) => new Date(a.next_due_date).getTime() - new Date(b.next_due_date).getTime());

    return {
      pet,
      vaccination_status: vaccinationStatus,
      last_consultation: lastConsultation,
      upcoming_vaccinations: upcomingVaccinations,
      total_documents: documents.length,
      has_feeding_schedule: !!feedingSchedule,
      health_alerts: [
        ...vaccinations
          .filter(v => v.status === 'expired')
          .map(v => ({
            type: 'vaccination_expired',
            message: `Vaccinul ${v.vaccine_name} a expirat`,
            severity: 'high',
            date: v.next_due_date,
          })),
        ...vaccinations
          .filter(v => v.status === 'due_soon')
          .map(v => ({
            type: 'vaccination_due',
            message: `Vaccinul ${v.vaccine_name} este programat în curând`,
            severity: 'medium',
            date: v.next_due_date,
          })),
      ],
    };
  }

  async getStatistics() {
    const pets = await this.findAll();
    const totalPets = pets.length;
    const activePets = pets.filter(pet => pet.is_active).length;
    
    const speciesBreakdown = pets.reduce((acc, pet) => {
      acc[pet.species] = (acc[pet.species] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const genderBreakdown = pets.reduce((acc, pet) => {
      acc[pet.gender] = (acc[pet.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ageGroups = pets.reduce((acc, pet) => {
      if (pet.birth_date) {
        const age = new Date().getFullYear() - new Date(pet.birth_date).getFullYear();
        if (age < 1) acc['<1'] = (acc['<1'] || 0) + 1;
        else if (age < 3) acc['1-3'] = (acc['1-3'] || 0) + 1;
        else if (age < 7) acc['3-7'] = (acc['3-7'] || 0) + 1;
        else acc['7+'] = (acc['7+'] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      total: totalPets,
      active: activePets,
      by_species: speciesBreakdown,
      by_gender: genderBreakdown,
      by_age_group: ageGroups,
      neutered: pets.filter(p => p.is_neutered).length,
      with_insurance: pets.filter(p => p.insurance).length,
      with_microchip: pets.filter(p => p.microchip).length,
    };
  }

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create(createPetDto);
    return this.petRepository.save(pet);
  }

  async update(id: number, updatePetDto: Partial<CreatePetDto>): Promise<Pet> {
    await this.petRepository.update(id, updatePetDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.petRepository.delete(id);
  }
}