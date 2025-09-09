export enum FoodType {
  CROQUETTES = 'croquettes',
  WET_FOOD = 'wet_food',
  PELLETS = 'pellets',
  MIXED = 'mixed',
}

export interface Supplement {
  name: string;
  dosage: string;
  frequency: string;
  with_meal: boolean;
}

export interface FeedingNote {
  date: string;
  note: string;
  extra_food: string;
  created_by: number;
}

export interface FeedingSchedule {
  id: number;
  pet_id: number;
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
  supplements: Supplement[];
  feeding_notes: FeedingNote[];
  created_at: string;
  updated_at: string;
}