import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';
import { FoodType } from '@/common/interfaces';

@Injectable()
export class FeedingSchedulesService {
  constructor(
    @InjectRepository(FeedingSchedule)
    private feedingScheduleRepository: Repository<FeedingSchedule>,
  ) {}

  async findAll(): Promise<FeedingSchedule[]> {
    return this.feedingScheduleRepository.find({
      relations: ['pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<FeedingSchedule | null> {
    return this.feedingScheduleRepository.findOne({
      where: { id },
      relations: ['pet'],
    });
  }

  async findByPetId(petId: number): Promise<FeedingSchedule[]> {
    return this.feedingScheduleRepository.find({
      where: { pet_id: petId },
      relations: ['pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findByFoodType(foodType: FoodType): Promise<FeedingSchedule[]> {
    return this.feedingScheduleRepository.find({
      where: { food_type: foodType },
      relations: ['pet'],
      order: { created_at: 'DESC' },
    });
  }

  async getStatistics() {
    const schedules = await this.findAll();
    
    const foodTypeBreakdown = schedules.reduce((acc, schedule) => {
      acc[schedule.food_type] = (acc[schedule.food_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const brandBreakdown = schedules.reduce((acc, schedule) => {
      acc[schedule.food_brand] = (acc[schedule.food_brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mealsBreakdown = schedules.reduce((acc, schedule) => {
      const meals = schedule.meals_per_day.toString();
      acc[meals] = (acc[meals] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const withSupplements = schedules.filter(s => s.supplements && s.supplements.length > 0).length;
    const withRestrictions = schedules.filter(s => s.dietary_restrictions && s.dietary_restrictions.length > 0).length;
    const allowTreats = schedules.filter(s => s.treats_allowed).length;

    const totalDailyAmount = schedules.reduce((sum, s) => sum + s.daily_amount, 0);
    const averageDailyAmount = schedules.length > 0 ? totalDailyAmount / schedules.length : 0;

    return {
      total: schedules.length,
      by_food_type: foodTypeBreakdown,
      by_brand: brandBreakdown,
      by_meals_per_day: mealsBreakdown,
      with_supplements: withSupplements,
      with_dietary_restrictions: withRestrictions,
      treats_allowed: allowTreats,
      average_daily_amount: Math.round(averageDailyAmount * 100) / 100,
      total_pets_with_schedule: schedules.length,
    };
  }

  async getRecommendations(id: number) {
    const schedule = await this.findOne(id);
    if (!schedule) return null;

    const recommendations = [];

    // Weight-based recommendations
    if (schedule.pet && schedule.pet.weight) {
      const weightKg = Number(schedule.pet.weight);
      const recommendedDaily = weightKg * 25; // Basic calculation: 25g per kg
      
      if (schedule.daily_amount > recommendedDaily * 1.2) {
        recommendations.push({
          type: 'warning',
          message: 'Cantitatea zilnică de hrană pare să fie prea mare pentru greutatea animalului',
          suggestion: `Cantitate recomandată: ${Math.round(recommendedDaily)}g pe zi`,
        });
      } else if (schedule.daily_amount < recommendedDaily * 0.8) {
        recommendations.push({
          type: 'warning',
          message: 'Cantitatea zilnică de hrană pare să fie prea mică pentru greutatea animalului',
          suggestion: `Cantitate recomandată: ${Math.round(recommendedDaily)}g pe zi`,
        });
      } else {
        recommendations.push({
          type: 'success',
          message: 'Cantitatea zilnică de hrană este adecvată pentru greutatea animalului',
        });
      }
    }

    // Meal frequency recommendations
    if (schedule.meals_per_day < 2) {
      recommendations.push({
        type: 'info',
        message: 'Pentru o digestie mai bună, se recomandă împărțirea hranei în cel puțin 2 mese pe zi',
      });
    }

    // Treats recommendations
    if (schedule.treats_allowed && schedule.treats_daily_limit > schedule.daily_amount * 0.1) {
      recommendations.push({
        type: 'warning',
        message: 'Cantitatea de recompense nu ar trebui să depășească 10% din hrana zilnică',
      });
    }

    // Supplement recommendations
    if (schedule.pet && schedule.pet.medical_conditions && schedule.pet.medical_conditions.length > 0) {
      recommendations.push({
        type: 'info',
        message: 'Având în vedere condițiile medicale ale animalului, consultați veterinarul pentru suplimente specifice',
      });
    }

    return {
      schedule_id: id,
      recommendations,
      last_updated: new Date().toISOString(),
    };
  }

  async addFeedingNote(id: number, feedingNoteDto: any): Promise<FeedingSchedule> {
    const schedule = await this.findOne(id);
    if (!schedule) throw new Error('Feeding schedule not found');

    const newNote = {
      date: new Date().toISOString().split('T')[0],
      ...feedingNoteDto,
    };

    const updatedNotes = [...(schedule.feeding_notes || []), newNote];
    
    await this.feedingScheduleRepository.update(id, { feeding_notes: updatedNotes });
    return this.findOne(id);
  }

  async create(createScheduleDto: any): Promise<FeedingSchedule> {
    const schedule = this.feedingScheduleRepository.create(createScheduleDto);
    return (await this.feedingScheduleRepository.save(schedule)) as unknown as FeedingSchedule;
  }

  async update(id: number, updateScheduleDto: any): Promise<FeedingSchedule> {
    await this.feedingScheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.feedingScheduleRepository.delete(id);
  }
}