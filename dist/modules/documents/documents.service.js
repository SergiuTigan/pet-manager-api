"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("../../entities/document.entity");
let DocumentsService = class DocumentsService {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async findAll() {
        return this.documentRepository.find({
            relations: ['pet', 'uploaded_by_user', 'consultation'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        return this.documentRepository.findOne({
            where: { id },
            relations: ['pet', 'uploaded_by_user', 'consultation'],
        });
    }
    async findByPetId(petId) {
        return this.documentRepository.find({
            where: { pet_id: petId },
            relations: ['pet', 'uploaded_by_user', 'consultation'],
            order: { created_at: 'DESC' },
        });
    }
    async findByType(type) {
        return this.documentRepository.find({
            where: { document_type: type },
            relations: ['pet', 'uploaded_by_user', 'consultation'],
            order: { created_at: 'DESC' },
        });
    }
    async findByConsultationId(consultationId) {
        return this.documentRepository.find({
            where: { consultation_id: consultationId },
            relations: ['pet', 'uploaded_by_user', 'consultation'],
            order: { created_at: 'DESC' },
        });
    }
    async findByPublicStatus(isPublic) {
        return this.documentRepository.find({
            where: { is_public: isPublic },
            relations: ['pet', 'uploaded_by_user', 'consultation'],
            order: { created_at: 'DESC' },
        });
    }
    async getExpiringDocuments(days = 30) {
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
        }, {});
        const fileTypeBreakdown = documents.reduce((acc, document) => {
            acc[document.file_type] = (acc[document.file_type] || 0) + 1;
            return acc;
        }, {});
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
    async create(createDocumentDto) {
        const document = this.documentRepository.create({
            ...createDocumentDto,
            upload_date: new Date(),
        });
        return (await this.documentRepository.save(document));
    }
    async update(id, updateDocumentDto) {
        await this.documentRepository.update(id, updateDocumentDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.documentRepository.delete(id);
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map