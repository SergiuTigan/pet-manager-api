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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const documents_service_1 = require("./documents.service");
const interfaces_1 = require("../../common/interfaces");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async findAll(petId, type, consultationId, isPublic) {
        if (petId) {
            return this.documentsService.findByPetId(parseInt(petId));
        }
        if (type) {
            return this.documentsService.findByType(type);
        }
        if (consultationId) {
            return this.documentsService.findByConsultationId(parseInt(consultationId));
        }
        if (isPublic !== undefined) {
            return this.documentsService.findByPublicStatus(isPublic === 'true');
        }
        return this.documentsService.findAll();
    }
    getExpiringDocuments(days) {
        const daysAhead = days ? parseInt(days) : 30;
        return this.documentsService.getExpiringDocuments(daysAhead);
    }
    getStatistics() {
        return this.documentsService.getStatistics();
    }
    async findOne(id) {
        const document = await this.documentsService.findOne(id);
        if (!document) {
            throw new common_1.HttpException('Document not found', common_1.HttpStatus.NOT_FOUND);
        }
        return document;
    }
    async create(createDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }
    async update(id, updateDocumentDto) {
        const existingDocument = await this.findOne(id);
        return this.documentsService.update(id, updateDocumentDto);
    }
    async remove(id) {
        const existingDocument = await this.findOne(id);
        return this.documentsService.remove(id);
    }
    async downloadDocument(id) {
        const document = await this.findOne(id);
        return {
            download_url: document.file_url,
            filename: document.title,
            file_type: document.file_type,
            file_size: document.file_size,
        };
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all documents' }),
    (0, swagger_1.ApiQuery)({ name: 'petId', required: false, description: 'Filter by pet ID' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: interfaces_1.DocumentType, description: 'Filter by document type' }),
    (0, swagger_1.ApiQuery)({ name: 'consultationId', required: false, description: 'Filter by consultation ID' }),
    (0, swagger_1.ApiQuery)({ name: 'isPublic', required: false, description: 'Filter by public visibility' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of documents retrieved successfully' }),
    __param(0, (0, common_1.Query)('petId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('consultationId')),
    __param(3, (0, common_1.Query)('isPublic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('expiring'),
    (0, swagger_1.ApiOperation)({ summary: 'Get documents expiring soon' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, description: 'Number of days ahead to check (default: 30)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expiring documents retrieved successfully' }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getExpiringDocuments", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get document statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get document by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a new document' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Document uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a document' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a document' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Download a document' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document download URL retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "downloadDocument", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('documents'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map