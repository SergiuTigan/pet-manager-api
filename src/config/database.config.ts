import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Pet } from '../entities/pet.entity';
import { Vaccination } from '../entities/vaccination.entity';
import { Consultation } from '../entities/consultation.entity';
import { Document } from '../entities/document.entity';
import { FeedingSchedule } from '../entities/feeding-schedule.entity';
import { Notification } from '../entities/notification.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'petmanager',
  password: process.env.DB_PASSWORD || 'petmanager123',
  database: process.env.DB_NAME || 'petmanager',
  entities: [User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  extra: {
    timezone: 'UTC',
  },
};