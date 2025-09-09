import { Repository } from 'typeorm';
import { Pet } from '@/entities/pet.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Document } from '@/entities/document.entity';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';
import { CreatePetDto } from '@/common/dto';
import { PetSpecies } from '@/common/interfaces';
export declare class PetsService {
    private petRepository;
    private vaccinationRepository;
    private consultationRepository;
    private documentRepository;
    private feedingScheduleRepository;
    constructor(petRepository: Repository<Pet>, vaccinationRepository: Repository<Vaccination>, consultationRepository: Repository<Consultation>, documentRepository: Repository<Document>, feedingScheduleRepository: Repository<FeedingSchedule>);
    findAll(): Promise<Pet[]>;
    findOne(id: number): Promise<Pet | null>;
    findByOwnerId(ownerId: number): Promise<Pet[]>;
    findBySpecies(species: PetSpecies): Promise<Pet[]>;
    searchPets(query: string): Promise<Pet[]>;
    getPetVaccinations(petId: number): Promise<any>;
    getPetConsultations(petId: number): Promise<any>;
    getPetDocuments(petId: number): Promise<any>;
    getPetFeedingSchedule(petId: number): Promise<any>;
    getHealthSummary(petId: number): Promise<{
        pet: Pet;
        vaccination_status: {
            total: any;
            valid: any;
            due_soon: any;
            expired: any;
        };
        last_consultation: any;
        upcoming_vaccinations: any;
        total_documents: any;
        has_feeding_schedule: boolean;
        health_alerts: any[];
    }>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        by_species: Record<string, number>;
        by_gender: Record<string, number>;
        by_age_group: Record<string, number>;
        neutered: number;
        with_insurance: number;
        with_microchip: number;
    }>;
    create(createPetDto: CreatePetDto): Promise<Pet>;
    update(id: number, updatePetDto: Partial<CreatePetDto>): Promise<Pet>;
    remove(id: number): Promise<void>;
}
