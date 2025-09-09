import { Repository } from 'typeorm';
import { FeedingSchedule } from '@/entities/feeding-schedule.entity';
import { FoodType } from '@/common/interfaces';
export declare class FeedingSchedulesService {
    private feedingScheduleRepository;
    constructor(feedingScheduleRepository: Repository<FeedingSchedule>);
    findAll(): Promise<FeedingSchedule[]>;
    findOne(id: number): Promise<FeedingSchedule | null>;
    findByPetId(petId: number): Promise<FeedingSchedule[]>;
    findByFoodType(foodType: FoodType): Promise<FeedingSchedule[]>;
    getStatistics(): Promise<{
        total: number;
        by_food_type: Record<string, number>;
        by_brand: Record<string, number>;
        by_meals_per_day: Record<string, number>;
        with_supplements: number;
        with_dietary_restrictions: number;
        treats_allowed: number;
        average_daily_amount: number;
        total_pets_with_schedule: number;
    }>;
    getRecommendations(id: number): Promise<{
        schedule_id: number;
        recommendations: any[];
        last_updated: string;
    }>;
    addFeedingNote(id: number, feedingNoteDto: any): Promise<FeedingSchedule>;
    create(createScheduleDto: any): Promise<FeedingSchedule>;
    update(id: number, updateScheduleDto: any): Promise<FeedingSchedule>;
    remove(id: number): Promise<void>;
}
