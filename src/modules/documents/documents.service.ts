import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@/entities/document.entity';
import { DocumentType } from '@/common/interfaces';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find({
      relations: ['pet', 'uploaded_by_user', 'consultation'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Document | null> {
    return this.documentRepository.findOne({
      where: { id },
      relations: ['pet', 'uploaded_by_user', 'consultation'],
    });
  }

  async findByPetId(petId: number): Promise<Document[]> {
    return this.documentRepository.find({
      where: { pet_id: petId },
      relations: ['pet', 'uploaded_by_user', 'consultation'],
      order: { created_at: 'DESC' },
    });
  }

  async findByType(type: DocumentType): Promise<Document[]> {
    return this.documentRepository.find({
      where: { document_type: type },
      relations: ['pet', 'uploaded_by_user', 'consultation'],
      order: { created_at: 'DESC' },
    });
  }

  async findByConsultationId(consultationId: number): Promise<Document[]> {
    return this.documentRepository.find({
      where: { consultation_id: consultationId },
      relations: ['pet', 'uploaded_by_user', 'consultation'],
      order: { created_at: 'DESC' },
    });
  }

  async findByPublicStatus(isPublic: boolean): Promise<Document[]> {
    return this.documentRepository.find({
      where: { is_public: isPublic },
      relations: ['pet', 'uploaded_by_user', 'consultation'],
      order: { created_at: 'DESC' },
    });
  }

  async getExpiringDocuments(days: number = 30): Promise<Document[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.pet', 'pet')
      .leftJoinAndSelect('document.uploaded_by_user', 'user')
      .where('document.expiry_date IS NOT NULL')
      .andWhere('document.expiry_date >= :today', { today })
      .andWhere('document.expiry_date <= :futureDate', { futureDate })
      .orderBy('document.expiry_date', 'ASC')
      .getMany();
  }

  async getStatistics() {
    const documents = await this.findAll();
    
    const typeBreakdown = documents.reduce((acc, document) => {
      acc[document.document_type] = (acc[document.document_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const fileTypeBreakdown = documents.reduce((acc, document) => {
      acc[document.file_type] = (acc[document.file_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalFileSize = documents.reduce((sum, doc) => sum + doc.file_size, 0);
    const publicDocuments = documents.filter(doc => doc.is_public).length;
    const documentsWithExpiry = documents.filter(doc => doc.expiry_date).length;
    const expiringCount = (await this.getExpiringDocuments(30)).length;

    const recentUploads = documents.filter(doc => {
      const uploadDate = new Date(doc.created_at);
      const daysSinceUpload = (Date.now() - uploadDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpload <= 7;
    }).length;

    return {
      total: documents.length,
      by_type: typeBreakdown,
      by_file_type: fileTypeBreakdown,
      total_file_size_mb: Math.round(totalFileSize / (1024 * 1024)),
      public_documents: publicDocuments,
      with_expiry_date: documentsWithExpiry,
      expiring_soon: expiringCount,
      recent_uploads: recentUploads,
      average_file_size_kb: documents.length > 0 ? Math.round((totalFileSize / documents.length) / 1024) : 0,
    };
  }

  async create(createDocumentDto: any): Promise<Document> {
    const document = this.documentRepository.create({
      ...createDocumentDto,
      upload_date: new Date(),
    });
    return (await this.documentRepository.save(document)) as unknown as Document;
  }

  async update(id: number, updateDocumentDto: any): Promise<Document> {
    await this.documentRepository.update(id, updateDocumentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}