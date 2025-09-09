import { DocumentsService } from './documents.service';
import { DocumentType } from '@/common/interfaces';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    findAll(petId?: string, type?: DocumentType, consultationId?: string, isPublic?: string): Promise<import("../../entities").Document[]>;
    getExpiringDocuments(days?: string): Promise<import("../../entities").Document[]>;
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
    findOne(id: number): Promise<import("../../entities").Document>;
    create(createDocumentDto: any): Promise<import("../../entities").Document>;
    update(id: number, updateDocumentDto: any): Promise<import("../../entities").Document>;
    remove(id: number): Promise<void>;
    downloadDocument(id: number): Promise<{
        download_url: string;
        filename: string;
        file_type: string;
        file_size: number;
    }>;
}
