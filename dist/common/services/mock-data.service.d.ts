import { OnModuleInit } from '@nestjs/common';
import { User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification } from '../interfaces';
export declare class MockDataService implements OnModuleInit {
    private readonly logger;
    private readonly dataPath;
    private users;
    private pets;
    private vaccinations;
    private consultations;
    private documents;
    private feedingSchedules;
    private notifications;
    onModuleInit(): Promise<void>;
    private loadMockData;
    private loadJsonFile;
    getUsers(): User[];
    getUserById(id: number): User | undefined;
    getUserByEmail(email: string): User | undefined;
    getUsersByType(type: string): User[];
    getPets(): Pet[];
    getPetById(id: number): Pet | undefined;
    getPetsByOwnerId(ownerId: number): Pet[];
    getPetsBySpecies(species: string): Pet[];
    getVaccinations(): Vaccination[];
    getVaccinationById(id: number): Vaccination | undefined;
    getVaccinationsByPetId(petId: number): Vaccination[];
    getVaccinationsByStatus(status: string): Vaccination[];
    getVaccinationsByVetId(vetId: number): Vaccination[];
    getConsultations(): Consultation[];
    getConsultationById(id: number): Consultation | undefined;
    getConsultationsByPetId(petId: number): Consultation[];
    getConsultationsByVetId(vetId: number): Consultation[];
    getConsultationsByStatus(status: string): Consultation[];
    getDocuments(): Document[];
    getDocumentById(id: number): Document | undefined;
    getDocumentsByPetId(petId: number): Document[];
    getDocumentsByType(type: string): Document[];
    getPublicDocuments(): Document[];
    getFeedingSchedules(): FeedingSchedule[];
    getFeedingScheduleById(id: number): FeedingSchedule | undefined;
    getFeedingScheduleByPetId(petId: number): FeedingSchedule | undefined;
    getNotifications(): Notification[];
    getNotificationById(id: number): Notification | undefined;
    getNotificationsByUserId(userId: number): Notification[];
    getUnreadNotificationsByUserId(userId: number): Notification[];
    getNotificationsByPriority(priority: string): Notification[];
    getStatistics(): {
        pets: {
            total: number;
            active: number;
            by_species: Record<string, number>;
        };
        users: {
            total_owners: number;
            total_vets: number;
        };
        vaccinations: {
            total: number;
            valid: number;
            due_soon: number;
            expired: number;
        };
        consultations: {
            total: number;
            completed: number;
            scheduled: number;
            in_progress: number;
        };
        documents: {
            total: number;
            public: number;
        };
        notifications: {
            total: number;
            unread: number;
            urgent: number;
        };
    };
    searchPets(query: string): Pet[];
    searchUsers(query: string): User[];
    getDashboardDataForUser(userId: number): {
        user: User;
        pets: Pet[];
        notifications: Notification[];
        stats: {
            total_pets: number;
            active_pets: number;
            vaccinations_due_soon: number;
            vaccinations_expired: number;
            upcoming_appointments: number;
            total_consultations?: undefined;
            today_appointments?: undefined;
            pending_appointments?: undefined;
            completed_today?: undefined;
        };
        recent_activity: {
            type: string;
            date: string;
            description: string;
        }[];
    } | {
        user: User;
        notifications: Notification[];
        stats: {
            total_consultations: number;
            today_appointments: number;
            pending_appointments: number;
            completed_today: number;
            total_pets?: undefined;
            active_pets?: undefined;
            vaccinations_due_soon?: undefined;
            vaccinations_expired?: undefined;
            upcoming_appointments?: undefined;
        };
        recent_activity: {
            type: string;
            date: string;
            description: string;
            pet: Pet;
            owner: User;
        }[];
        pets?: undefined;
    };
}
