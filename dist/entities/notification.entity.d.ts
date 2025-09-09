import { NotificationType, NotificationPriority } from '@/common/interfaces';
import { User } from './user.entity';
import { Pet } from './pet.entity';
export declare class Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    is_read: boolean;
    action_required: boolean;
    action_url: string;
    scheduled_for: Date;
    sent_at: Date;
    expires_at: Date;
    metadata: any;
    created_at: Date;
    user: User;
    user_id: number;
    pet: Pet;
    pet_id: number;
}
