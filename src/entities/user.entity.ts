import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserType } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { Consultation } from './consultation.entity';
import { Vaccination } from './vaccination.entity';
import { Notification } from './notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.OWNER
  })
  type: UserType;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_login: Date;

  @Column('jsonb', { nullable: true })
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      reminders: boolean;
    };
    language: string;
  };

  // Veterinarian-specific fields
  @Column({ nullable: true })
  clinic_name: string;

  @Column({ nullable: true })
  clinic_address: string;

  @Column({ nullable: true })
  license_number: string;

  @Column('simple-array', { nullable: true })
  specializations: string[];

  @Column('jsonb', { nullable: true })
  working_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  // Relations
  @OneToMany(() => Pet, pet => pet.owner)
  pets: Pet[];

  @OneToMany(() => Consultation, consultation => consultation.veterinarian)
  consultations_as_vet: Consultation[];

  @OneToMany(() => Vaccination, vaccination => vaccination.administered_by_vet)
  vaccinations_administered: Vaccination[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}