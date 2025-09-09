import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationType, NotificationPriority } from '@/common/interfaces';
import { User } from './user.entity';
import { Pet } from './pet.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: NotificationType
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM
  })
  priority: NotificationPriority;

  @Column({ default: false })
  is_read: boolean;

  @Column({ default: false })
  action_required: boolean;

  @Column({ nullable: true })
  action_url: string;

  @Column({ type: 'timestamp' })
  scheduled_for: Date;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  @Column('jsonb', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Pet, { nullable: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column({ nullable: true })
  pet_id: number;
}