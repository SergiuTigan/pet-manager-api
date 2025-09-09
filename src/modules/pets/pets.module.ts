import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from '@/entities/pet.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Document } from '@/entities/document.entity';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Vaccination, Consultation, Document, FeedingSchedule])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}