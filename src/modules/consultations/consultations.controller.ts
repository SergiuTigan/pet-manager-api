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
import { ConsultationsService } from './consultations.service';
import { ConsultationType, ConsultationStatus } from '@/common/interfaces';

@ApiTags('consultations')
@ApiBearerAuth('JWT-auth')
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  @ApiQuery({ name: 'petId', required: false, description: 'Filter by pet ID' })
  @ApiQuery({ name: 'vetId', required: false, description: 'Filter by veterinarian ID' })
  @ApiQuery({ name: 'status', required: false, enum: ConsultationStatus, description: 'Filter by status' })
  @ApiQuery({ name: 'type', required: false, enum: ConsultationType, description: 'Filter by consultation type' })
  @ApiResponse({ status: 200, description: 'List of consultations retrieved successfully' })
  async findAll(
    @Query('petId') petId?: string,
    @Query('vetId') vetId?: string,
    @Query('status') status?: ConsultationStatus,
    @Query('type') type?: ConsultationType,
  ) {
    if (petId) {
      return this.consultationsService.findByPetId(parseInt(petId));
    }
    
    if (vetId) {
      return this.consultationsService.findByVetId(parseInt(vetId));
    }
    
    if (status) {
      return this.consultationsService.findByStatus(status);
    }

    if (type) {
      return this.consultationsService.findByType(type);
    }

    return this.consultationsService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming consultations' })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days ahead to check (default: 7)' })
  @ApiResponse({ status: 200, description: 'Upcoming consultations retrieved successfully' })
  getUpcomingConsultations(@Query('days') days?: string) {
    const daysAhead = days ? parseInt(days) : 7;
    return this.consultationsService.getUpcomingConsultations(daysAhead);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get consultation statistics' })
  @ApiResponse({ status: 200, description: 'Consultation statistics retrieved successfully' })
  getStatistics() {
    return this.consultationsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by ID' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const consultation = await this.consultationsService.findOne(id);
    if (!consultation) {
      throw new HttpException('Consultation not found', HttpStatus.NOT_FOUND);
    }
    return consultation;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  @ApiResponse({ status: 201, description: 'Consultation created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createConsultationDto: any) {
    return this.consultationsService.create(createConsultationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a consultation' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation updated successfully' })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateConsultationDto: any) {
    const existingConsultation = await this.findOne(id);
    return this.consultationsService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation deleted successfully' })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingConsultation = await this.findOne(id);
    return this.consultationsService.remove(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update consultation status' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation status updated successfully' })
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ConsultationStatus) {
    return this.consultationsService.updateStatus(id, status);
  }
}