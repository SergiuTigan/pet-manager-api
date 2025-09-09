import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification } from '../entities';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async seedDatabase(): Promise<void> {
    try {
      this.logger.log('Starting database seeding...');

      // Check if data already exists
      const userCount = await this.userRepository.count();
      if (userCount > 0) {
        this.logger.log('Database already seeded, skipping...');
        return;
      }

      // Load JSON data
      const dataPath = path.join(process.cwd(), '..', 'mock-data');
      
      // Seed Users
      const usersData = JSON.parse(fs.readFileSync(path.join(dataPath, 'users.json'), 'utf8'));
      for (const userData of usersData) {
        const user = this.userRepository.create({
          ...userData,
          created_at: new Date(userData.created_at),
          last_login: new Date(userData.last_login),
        });
        await this.userRepository.save(user);
      }
      this.logger.log(`Seeded ${usersData.length} users`);

      // Seed Pets
      const petsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'pets.json'), 'utf8'));
      for (const petData of petsData) {
        const pet = this.petRepository.create({
          ...petData,
          birth_date: petData.birth_date ? new Date(petData.birth_date) : null,
          created_at: new Date(petData.created_at),
        });
        await this.petRepository.save(pet);
      }
      this.logger.log(`Seeded ${petsData.length} pets`);

      // Seed Vaccinations
      const vaccinationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'vaccinations.json'), 'utf8'));
      for (const vaccinationData of vaccinationsData) {
        const vaccination = this.vaccinationRepository.create({
          ...vaccinationData,
          date_administered: new Date(vaccinationData.date_administered),
          next_due_date: new Date(vaccinationData.next_due_date),
          created_at: new Date(vaccinationData.created_at),
        });
        await this.vaccinationRepository.save(vaccination);
      }
      this.logger.log(`Seeded ${vaccinationsData.length} vaccinations`);

      // Seed Consultations
      const consultationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'consultations.json'), 'utf8'));
      for (const consultationData of consultationsData) {
        const consultation = this.consultationRepository.create({
          ...consultationData,
          appointment_date: new Date(consultationData.appointment_date),
          next_appointment: consultationData.next_appointment ? new Date(consultationData.next_appointment) : null,
          created_at: new Date(consultationData.created_at),
          updated_at: new Date(consultationData.updated_at),
        });
        await this.consultationRepository.save(consultation);
      }
      this.logger.log(`Seeded ${consultationsData.length} consultations`);

      // Seed Documents
      const documentsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'documents.json'), 'utf8'));
      for (const documentData of documentsData) {
        const document = this.documentRepository.create({
          ...documentData,
          upload_date: new Date(documentData.upload_date),
          expiry_date: documentData.expiry_date ? new Date(documentData.expiry_date) : null,
          created_at: new Date(documentData.created_at),
        });
        await this.documentRepository.save(document);
      }
      this.logger.log(`Seeded ${documentsData.length} documents`);

      // Seed Feeding Schedules
      const feedingData = JSON.parse(fs.readFileSync(path.join(dataPath, 'feeding-schedules.json'), 'utf8'));
      for (const feedingScheduleData of feedingData) {
        const feedingSchedule = this.feedingScheduleRepository.create({
          ...feedingScheduleData,
          created_at: new Date(feedingScheduleData.created_at),
          updated_at: new Date(feedingScheduleData.updated_at),
        });
        await this.feedingScheduleRepository.save(feedingSchedule);
      }
      this.logger.log(`Seeded ${feedingData.length} feeding schedules`);

      // Seed Notifications
      const notificationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'notifications.json'), 'utf8'));
      for (const notificationData of notificationsData) {
        const notification = this.notificationRepository.create({
          ...notificationData,
          scheduled_for: new Date(notificationData.scheduled_for),
          sent_at: notificationData.sent_at ? new Date(notificationData.sent_at) : null,
          expires_at: notificationData.expires_at ? new Date(notificationData.expires_at) : null,
          created_at: new Date(notificationData.created_at),
        });
        await this.notificationRepository.save(notification);
      }
      this.logger.log(`Seeded ${notificationsData.length} notifications`);

      this.logger.log('Database seeding completed successfully!');
    } catch (error) {
      this.logger.error('Database seeding failed:', error);
      throw error;
    }
  }

  async clearDatabase(): Promise<void> {
    this.logger.log('Clearing database...');
    
    // Clear in reverse order to avoid foreign key constraints
    await this.notificationRepository.clear();
    await this.documentRepository.clear();
    await this.feedingScheduleRepository.clear();
    await this.consultationRepository.clear();
    await this.vaccinationRepository.clear();
    await this.petRepository.clear();
    await this.userRepository.clear();
    
    this.logger.log('Database cleared successfully!');
  }
}