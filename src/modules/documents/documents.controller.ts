import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { DocumentType } from '@/common/interfaces';

@ApiTags('documents')
@ApiBearerAuth('JWT-auth')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiQuery({ name: 'petId', required: false, description: 'Filter by pet ID' })
  @ApiQuery({ name: 'type', required: false, enum: DocumentType, description: 'Filter by document type' })
  @ApiQuery({ name: 'consultationId', required: false, description: 'Filter by consultation ID' })
  @ApiQuery({ name: 'isPublic', required: false, description: 'Filter by public visibility' })
  @ApiResponse({ status: 200, description: 'List of documents retrieved successfully' })
  async findAll(
    @Query('petId') petId?: string,
    @Query('type') type?: DocumentType,
    @Query('consultationId') consultationId?: string,
    @Query('isPublic') isPublic?: string,
  ) {
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

  @Get('expiring')
  @ApiOperation({ summary: 'Get documents expiring soon' })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days ahead to check (default: 30)' })
  @ApiResponse({ status: 200, description: 'Expiring documents retrieved successfully' })
  getExpiringDocuments(@Query('days') days?: string) {
    const daysAhead = days ? parseInt(days) : 30;
    return this.documentsService.getExpiringDocuments(daysAhead);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get document statistics' })
  @ApiResponse({ status: 200, description: 'Document statistics retrieved successfully' })
  getStatistics() {
    return this.documentsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentsService.findOne(id);
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }
    return document;
  }

  @Post()
  @ApiOperation({ summary: 'Upload a new document' })
  @ApiResponse({ status: 201, description: 'Document uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createDocumentDto: any) {
    return this.documentsService.create(createDocumentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDocumentDto: any) {
    const existingDocument = await this.findOne(id);
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingDocument = await this.findOne(id);
    return this.documentsService.remove(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document download URL retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async downloadDocument(@Param('id', ParseIntPipe) id: number) {
    const document = await this.findOne(id);
    return {
      download_url: document.file_url,
      filename: document.title,
      file_type: document.file_type,
      file_size: document.file_size,
    };
  }
}