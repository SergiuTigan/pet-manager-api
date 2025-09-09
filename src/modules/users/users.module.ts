import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@/entities/user.entity';
import { Pet } from '@/entities/pet.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Notification } from '@/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, Consultation, Vaccination, Notification])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}