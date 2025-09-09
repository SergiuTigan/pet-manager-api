import { DocumentType } from '@/common/interfaces';
import { Pet } from './pet.entity';
import { User } from './user.entity';
import { Consultation } from './consultation.entity';
export declare class Document {
    id: number;
    document_type: DocumentType;
    title: string;
    description: string;
    file_url: string;
    file_type: string;
    file_size: number;
    upload_date: Date;
    consultation_id: number;
    is_public: boolean;
    tags: string[];
    notes: string;
    expiry_date: Date;
    created_at: Date;
    pet: Pet;
    pet_id: number;
    uploaded_by_user: User;
    uploaded_by: number;
    consultation: Consultation;
}
