import { FoodType } from '@/common/interfaces';
import { Pet } from './pet.entity';
export declare class FeedingSchedule {
    id: number;
    food_brand: string;
    food_type: FoodType;
    daily_amount: number;
    daily_amount_unit: string;
    meals_per_day: number;
    meal_times: string[];
    special_instructions: string;
    treats_allowed: boolean;
    treats_daily_limit: number;
    treats_daily_limit_unit: string;
    dietary_restrictions: string[];
    supplements: Array<{
        name: string;
        dosage: string;
        frequency: string;
        with_meal: boolean;
    }>;
    feeding_notes: Array<{
        date: string;
        note: string;
        extra_food: string;
        created_by: number;
    }>;
    created_at: Date;
    updated_at: Date;
    pet: Pet;
    pet_id: number;
}
