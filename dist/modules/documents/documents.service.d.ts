import { Repository } from 'typeorm';
import { Document } from '@/entities/document.entity';
import { DocumentType } from '@/common/interfaces';
export declare class DocumentsService {
    private documentRepository;
    constructor(documentRepository: Repository<Document>);
    findAll(): Promise<Document[]>;
    findOne(id: number): Promise<Document | null>;
    findByPetId(petId: number): Promise<Document[]>;
    findByType(type: DocumentType): Promise<Document[]>;
    findByConsultationId(consultationId: number): Promise<Document[]>;
    findByPublicStatus(isPublic: boolean): Promise<Document[]>;
    getExpiringDocuments(days?: number): Promise<Document[]>;
    getStatistics(): Promise<{
        total: number;
        by_type: Record<string, number>;
        by_file_type: Record<string, number>;
        total_file_size_mb: number;
        public_documents: number;
        with_expiry_date: number;
        expiring_soon: number;
        recent_uploads: number;
        average_file_size_kb: number;
    }>;
    create(createDocumentDto: any): Promise<Document>;
    update(id: number, updateDocumentDto: any): Promise<Document>;
    remove(id: number): Promise<void>;
}
