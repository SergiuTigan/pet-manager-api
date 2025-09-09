import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PetSpecies, PetGender } from '@/common/interfaces';
import { User } from './user.entity';
import { Vaccination } from './vaccination.entity';
import { Consultation } from './consultation.entity';
import { Document } from './document.entity';
import { FeedingSchedule } from './feeding-schedule.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PetSpecies
  })
  species: PetSpecies;

  @Column()
  breed: string;

  @Column({
    type: 'enum',
    enum: PetGender
  })
  gender: PetGender;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ nullable: true })
  microchip: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({ default: false })
  is_neutered: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column('simple-array', { nullable: true })
  medical_conditions: string[];

  @Column('simple-array', { nullable: true })
  allergies: string[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column('jsonb')
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };

  @Column('jsonb', { nullable: true })
  insurance: {
    provider: string;
    policy_number: string;
    valid_until: string;
  };

  // Relations
  @ManyToOne(() => User, user => user.pets)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  owner_id: number;

  @OneToMany(() => Vaccination, vaccination => vaccination.pet)
  vaccinations: Vaccination[];

  @OneToMany(() => Consultation, consultation => consultation.pet)
  consultations: Consultation[];

  @OneToMany(() => Document, document => document.pet)
  documents: Document[];

  @OneToMany(() => FeedingSchedule, schedule => schedule.pet)
  feeding_schedules: FeedingSchedule[];
}