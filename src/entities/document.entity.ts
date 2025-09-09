import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentType } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';
import { Consultation } from './consultation.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DocumentType
  })
  document_type: DocumentType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  file_url: string;

  @Column()
  file_type: string;

  @Column()
  file_size: number;

  @Column({ type: 'date' })
  upload_date: Date;

  @Column({ nullable: true })
  consultation_id: number;

  @Column({ default: false })
  is_public: boolean;

  @Column('simple-array')
  tags: string[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Pet, pet => pet.documents)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  pet_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploaded_by' })
  uploaded_by_user: User;

  @Column()
  uploaded_by: number;

  @ManyToOne(() => Consultation, { nullable: true })
  @JoinColumn({ name: 'consultation_id' })
  consultation: Consultation;
}