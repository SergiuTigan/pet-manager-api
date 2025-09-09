import { FeedingSchedulesService } from './feeding-schedules.service';
import { FoodType } from '@/common/interfaces';
export declare class FeedingSchedulesController {
    private readonly feedingSchedulesService;
    constructor(feedingSchedulesService: FeedingSchedulesService);
    findAll(petId?: string, foodType?: FoodType): Promise<import("../../entities").FeedingSchedule[]>;
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
    findOne(id: number): Promise<import("../../entities").FeedingSchedule>;
    create(createScheduleDto: any): Promise<import("../../entities").FeedingSchedule>;
    update(id: number, updateScheduleDto: any): Promise<import("../../entities").FeedingSchedule>;
    remove(id: number): Promise<void>;
    addFeedingNote(id: number, feedingNoteDto: any): Promise<import("../../entities").FeedingSchedule>;
    getRecommendations(id: number): Promise<{
        schedule_id: number;
        recommendations: any[];
        last_updated: string;
    }>;
}
