import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FoodType } from '@/common/interfaces';
import { Pet } from './pet.entity';

@Entity('feeding_schedules')
export class FeedingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  food_brand: string;

  @Column({
    type: 'enum',
    enum: FoodType
  })
  food_type: FoodType;

  @Column()
  daily_amount: number;

  @Column()
  daily_amount_unit: string;

  @Column()
  meals_per_day: number;

  @Column('simple-array')
  meal_times: string[];

  @Column({ type: 'text', nullable: true })
  special_instructions: string;

  @Column({ default: true })
  treats_allowed: boolean;

  @Column({ default: 0 })
  treats_daily_limit: number;

  @Column()
  treats_daily_limit_unit: string;

  @Column('simple-array', { nullable: true })
  dietary_restrictions: string[];

  @Column('jsonb', { nullable: true })
  supplements: Array<{
    name: string;
    dosage: string;
    frequency: string;
    with_meal: boolean;
  }>;

  @Column('jsonb', { nullable: true })
  feeding_notes: Array<{
    date: string;
    note: string;
    extra_food: string;
    created_by: number;
  }>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Pet, pet => pet.feeding_schedules)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  pet_id: number;
}