import { PetsService } from './pets.service';
import { CreatePetDto, UpdatePetDto } from '@/common/dto';
import { PetSpecies } from '@/common/interfaces';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    findAll(ownerId?: string, species?: PetSpecies, search?: string): Promise<import("../../entities").Pet[]>;
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
    findOne(id: number): Promise<import("../../entities").Pet>;
    getPetVaccinations(id: number): Promise<any>;
    getPetConsultations(id: number): Promise<any>;
    getPetDocuments(id: number): Promise<any>;
    getPetFeedingSchedule(id: number): Promise<any>;
    getPetHealthSummary(id: number): Promise<{
        pet: import("../../entities").Pet;
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
    create(createPetDto: CreatePetDto): Promise<import("../../entities").Pet>;
    update(id: number, updatePetDto: UpdatePetDto): Promise<import("../../entities").Pet>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
