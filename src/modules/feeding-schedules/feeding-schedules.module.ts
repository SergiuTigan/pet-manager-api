import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedingSchedulesService } from './feeding-schedules.service';
import { FeedingSchedulesController } from './feeding-schedules.controller';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedingSchedule])],
  controllers: [FeedingSchedulesController],
  providers: [FeedingSchedulesService],
  exports: [FeedingSchedulesService],
})
export class FeedingSchedulesModule {}