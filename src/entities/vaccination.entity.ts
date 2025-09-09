import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VaccineType, VaccinationStatus } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Entity('vaccinations')
export class Vaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vaccine_name: string;

  @Column({
    type: 'enum',
    enum: VaccineType
  })
  vaccine_type: VaccineType;

  @Column()
  manufacturer: string;

  @Column()
  batch_number: string;

  @Column({ type: 'date' })
  date_administered: Date;

  @Column({ type: 'date' })
  next_due_date: Date;

  @Column()
  clinic_name: string;

  @Column({ nullable: true })
  certificate_number: string;

  @Column()
  dose: string;

  @Column()
  site_of_injection: string;

  @Column({ type: 'text', nullable: true })
  reaction: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    enum: VaccinationStatus,
    default: VaccinationStatus.VALID
  })
  status: VaccinationStatus;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Pet, pet => pet.vaccinations)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  pet_id: number;

  @ManyToOne(() => User, user => user.vaccinations_administered)
  @JoinColumn({ name: 'administered_by_vet_id' })
  administered_by_vet: User;

  @Column()
  administered_by_vet_id: number;
}