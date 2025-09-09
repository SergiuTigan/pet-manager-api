import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConsultationType, ConsultationStatus } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  appointment_date: Date;

  @Column({
    type: 'enum',
    enum: ConsultationType
  })
  consultation_type: ConsultationType;

  @Column()
  reason: string;

  @Column('simple-array', { nullable: true })
  symptoms: string[];

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatment: string;

  @Column('jsonb', { nullable: true })
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;

  @Column('simple-array', { nullable: true })
  recommendations: string[];

  @Column({ type: 'timestamp', nullable: true })
  next_appointment: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
  temperature: number;

  @Column({ nullable: true })
  heart_rate: number;

  @Column({
    type: 'enum',
    enum: ConsultationStatus,
    default: ConsultationStatus.SCHEDULED
  })
  status: ConsultationStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  invoice_amount: number;

  @Column({ default: false })
  invoice_paid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Pet, pet => pet.consultations)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  pet_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'vet_id' })
  veterinarian: User;

  @Column()
  vet_id: number;
}