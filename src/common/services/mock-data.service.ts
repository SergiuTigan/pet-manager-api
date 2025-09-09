import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  User,
  Pet,
  Vaccination,
  Consultation,
  Document,
  FeedingSchedule,
  Notification,
} from '../interfaces';

@Injectable()
export class MockDataService implements OnModuleInit {
  private readonly logger = new Logger(MockDataService.name);
  private readonly dataPath = path.join(process.cwd(), '..', 'mock-data');

  private users: User[] = [];
  private pets: Pet[] = [];
  private vaccinations: Vaccination[] = [];
  private consultations: Consultation[] = [];
  private documents: Document[] = [];
  private feedingSchedules: FeedingSchedule[] = [];
  private notifications: Notification[] = [];

  async onModuleInit() {
    await this.loadMockData();
  }

  private async loadMockData(): Promise<void> {
    try {
      this.logger.log('Loading mock data...');
      
      this.users = await this.loadJsonFile<User[]>('users.json');
      this.pets = await this.loadJsonFile<Pet[]>('pets.json');
      this.vaccinations = await this.loadJsonFile<Vaccination[]>('vaccinations.json');
      this.consultations = await this.loadJsonFile<Consultation[]>('consultations.json');
      this.documents = await this.loadJsonFile<Document[]>('documents.json');
      this.feedingSchedules = await this.loadJsonFile<FeedingSchedule[]>('feeding-schedules.json');
      this.notifications = await this.loadJsonFile<Notification[]>('notifications.json');

      this.logger.log(`Loaded ${this.users.length} users`);
      this.logger.log(`Loaded ${this.pets.length} pets`);
      this.logger.log(`Loaded ${this.vaccinations.length} vaccinations`);
      this.logger.log(`Loaded ${this.consultations.length} consultations`);
      this.logger.log(`Loaded ${this.documents.length} documents`);
      this.logger.log(`Loaded ${this.feedingSchedules.length} feeding schedules`);
      this.logger.log(`Loaded ${this.notifications.length} notifications`);
    } catch (error) {
      this.logger.error('Error loading mock data:', error);
      throw error;
    }
  }

  private async loadJsonFile<T>(filename: string): Promise<T> {
    const filePath = path.join(this.dataPath, filename);
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      this.logger.error(`Error loading ${filename}:`, error);
      return [] as unknown as T;
    }
  }

  // Users
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  getUsersByType(type: string): User[] {
    return this.users.filter(user => user.type === type);
  }

  // Pets
  getPets(): Pet[] {
    return this.pets;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find(pet => pet.id === id);
  }

  getPetsByOwnerId(ownerId: number): Pet[] {
    return this.pets.filter(pet => pet.owner_id === ownerId);
  }

  getPetsBySpecies(species: string): Pet[] {
    return this.pets.filter(pet => pet.species === species);
  }

  // Vaccinations
  getVaccinations(): Vaccination[] {
    return this.vaccinations;
  }

  getVaccinationById(id: number): Vaccination | undefined {
    return this.vaccinations.find(vaccination => vaccination.id === id);
  }

  getVaccinationsByPetId(petId: number): Vaccination[] {
    return this.vaccinations.filter(vaccination => vaccination.pet_id === petId);
  }

  getVaccinationsByStatus(status: string): Vaccination[] {
    return this.vaccinations.filter(vaccination => vaccination.status === status);
  }

  getVaccinationsByVetId(vetId: number): Vaccination[] {
    return this.vaccinations.filter(vaccination => vaccination.administered_by_vet_id === vetId);
  }

  // Consultations
  getConsultations(): Consultation[] {
    return this.consultations;
  }

  getConsultationById(id: number): Consultation | undefined {
    return this.consultations.find(consultation => consultation.id === id);
  }

  getConsultationsByPetId(petId: number): Consultation[] {
    return this.consultations.filter(consultation => consultation.pet_id === petId);
  }

  getConsultationsByVetId(vetId: number): Consultation[] {
    return this.consultations.filter(consultation => consultation.vet_id === vetId);
  }

  getConsultationsByStatus(status: string): Consultation[] {
    return this.consultations.filter(consultation => consultation.status === status);
  }

  // Documents
  getDocuments(): Document[] {
    return this.documents;
  }

  getDocumentById(id: number): Document | undefined {
    return this.documents.find(document => document.id === id);
  }

  getDocumentsByPetId(petId: number): Document[] {
    return this.documents.filter(document => document.pet_id === petId);
  }

  getDocumentsByType(type: string): Document[] {
    return this.documents.filter(document => document.document_type === type);
  }

  getPublicDocuments(): Document[] {
    return this.documents.filter(document => document.is_public);
  }

  // Feeding Schedules
  getFeedingSchedules(): FeedingSchedule[] {
    return this.feedingSchedules;
  }

  getFeedingScheduleById(id: number): FeedingSchedule | undefined {
    return this.feedingSchedules.find(schedule => schedule.id === id);
  }

  getFeedingScheduleByPetId(petId: number): FeedingSchedule | undefined {
    return this.feedingSchedules.find(schedule => schedule.pet_id === petId);
  }

  // Notifications
  getNotifications(): Notification[] {
    return this.notifications;
  }

  getNotificationById(id: number): Notification | undefined {
    return this.notifications.find(notification => notification.id === id);
  }

  getNotificationsByUserId(userId: number): Notification[] {
    return this.notifications.filter(notification => notification.user_id === userId);
  }

  getUnreadNotificationsByUserId(userId: number): Notification[] {
    return this.notifications.filter(
      notification => notification.user_id === userId && !notification.is_read
    );
  }

  getNotificationsByPriority(priority: string): Notification[] {
    return this.notifications.filter(notification => notification.priority === priority);
  }

  // Statistics
  getStatistics() {
    const totalPets = this.pets.length;
    const activePets = this.pets.filter(pet => pet.is_active).length;
    const totalOwners = this.users.filter(user => user.type === 'owner').length;
    const totalVets = this.users.filter(user => user.type === 'veterinarian').length;
    
    const vaccinationStats = {
      total: this.vaccinations.length,
      valid: this.vaccinations.filter(v => v.status === 'valid').length,
      due_soon: this.vaccinations.filter(v => v.status === 'due_soon').length,
      expired: this.vaccinations.filter(v => v.status === 'expired').length,
    };

    const consultationStats = {
      total: this.consultations.length,
      completed: this.consultations.filter(c => c.status === 'completed').length,
      scheduled: this.consultations.filter(c => c.status === 'scheduled').length,
      in_progress: this.consultations.filter(c => c.status === 'in_progress').length,
    };

    const speciesBreakdown = this.pets.reduce((acc, pet) => {
      acc[pet.species] = (acc[pet.species] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      pets: {
        total: totalPets,
        active: activePets,
        by_species: speciesBreakdown,
      },
      users: {
        total_owners: totalOwners,
        total_vets: totalVets,
      },
      vaccinations: vaccinationStats,
      consultations: consultationStats,
      documents: {
        total: this.documents.length,
        public: this.documents.filter(d => d.is_public).length,
      },
      notifications: {
        total: this.notifications.length,
        unread: this.notifications.filter(n => !n.is_read).length,
        urgent: this.notifications.filter(n => n.priority === 'urgent').length,
      },
    };
  }

  // Search functionality
  searchPets(query: string): Pet[] {
    const lowercaseQuery = query.toLowerCase();
    return this.pets.filter(
      pet =>
        pet.name.toLowerCase().includes(lowercaseQuery) ||
        pet.breed.toLowerCase().includes(lowercaseQuery) ||
        pet.species.toLowerCase().includes(lowercaseQuery) ||
        pet.microchip.toLowerCase().includes(lowercaseQuery)
    );
  }

  searchUsers(query: string): User[] {
    const lowercaseQuery = query.toLowerCase();
    return this.users.filter(
      user =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        (user.clinic_name && user.clinic_name.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Dashboard data for specific user
  getDashboardDataForUser(userId: number) {
    const user = this.getUserById(userId);
    if (!user) return null;

    if (user.type === 'owner') {
      const userPets = this.getPetsByOwnerId(userId);
      const userNotifications = this.getUnreadNotificationsByUserId(userId);
      
      const petIds = userPets.map(p => p.id);
      const userVaccinations = this.vaccinations.filter(v => petIds.includes(v.pet_id));
      const userConsultations = this.consultations.filter(c => petIds.includes(c.pet_id));
      
      return {
        user,
        pets: userPets,
        notifications: userNotifications,
        stats: {
          total_pets: userPets.length,
          active_pets: userPets.filter(p => p.is_active).length,
          vaccinations_due_soon: userVaccinations.filter(v => v.status === 'due_soon').length,
          vaccinations_expired: userVaccinations.filter(v => v.status === 'expired').length,
          upcoming_appointments: userConsultations.filter(c => c.status === 'scheduled').length,
        },
        recent_activity: [
          ...userVaccinations.slice(-3).map(v => ({
            type: 'vaccination',
            date: v.date_administered,
            description: `${v.vaccine_name} administered to ${this.getPetById(v.pet_id)?.name}`,
          })),
          ...userConsultations.slice(-3).map(c => ({
            type: 'consultation',
            date: c.appointment_date,
            description: `${c.consultation_type} for ${this.getPetById(c.pet_id)?.name}`,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5),
      };
    } else if (user.type === 'veterinarian') {
      const vetConsultations = this.getConsultationsByVetId(userId);
      const vetVaccinations = this.getVaccinationsByVetId(userId);
      const vetNotifications = this.getUnreadNotificationsByUserId(userId);

      return {
        user,
        notifications: vetNotifications,
        stats: {
          total_consultations: vetConsultations.length,
          today_appointments: vetConsultations.filter(c => {
            const today = new Date().toISOString().split('T')[0];
            return c.appointment_date.split('T')[0] === today;
          }).length,
          pending_appointments: vetConsultations.filter(c => c.status === 'scheduled').length,
          completed_today: vetConsultations.filter(c => {
            const today = new Date().toISOString().split('T')[0];
            return c.appointment_date.split('T')[0] === today && c.status === 'completed';
          }).length,
        },
        recent_activity: [
          ...vetConsultations.slice(-5).map(c => ({
            type: 'consultation',
            date: c.appointment_date,
            description: `${c.consultation_type} for ${this.getPetById(c.pet_id)?.name}`,
            pet: this.getPetById(c.pet_id),
            owner: this.getUserById(this.getPetById(c.pet_id)?.owner_id),
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      };
    }

    return null;
  }
}