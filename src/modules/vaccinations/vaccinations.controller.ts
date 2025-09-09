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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationStatus, VaccineType } from '@/common/interfaces';

@ApiTags('vaccinations')
@Controller('vaccinations')
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vaccinations' })
  @ApiQuery({ name: 'petId', required: false, description: 'Filter by pet ID' })
  @ApiQuery({ name: 'vetId', required: false, description: 'Filter by veterinarian ID' })
  @ApiQuery({ name: 'status', required: false, enum: VaccinationStatus, description: 'Filter by status' })
  @ApiQuery({ name: 'type', required: false, enum: VaccineType, description: 'Filter by vaccine type' })
  @ApiResponse({ status: 200, description: 'List of vaccinations retrieved successfully' })
  async findAll(
    @Query('petId') petId?: string,
    @Query('vetId') vetId?: string,
    @Query('status') status?: VaccinationStatus,
    @Query('type') type?: VaccineType,
  ) {
    if (petId) {
      return this.vaccinationsService.findByPetId(parseInt(petId));
    }
    
    if (vetId) {
      return this.vaccinationsService.findByVetId(parseInt(vetId));
    }
    
    if (status) {
      return this.vaccinationsService.findByStatus(status);
    }

    if (type) {
      return this.vaccinationsService.findByType(type);
    }

    return this.vaccinationsService.findAll();
  }

  @Get('due-soon')
  @ApiOperation({ summary: 'Get vaccinations due soon' })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days ahead to check (default: 30)' })
  @ApiResponse({ status: 200, description: 'Vaccinations due soon retrieved successfully' })
  async getVaccinationsDueSoon(@Query('days') days?: string) {
    const daysAhead = days ? parseInt(days) : 30;
    return this.vaccinationsService.getVaccinationsDueSoon(daysAhead);
  }

  @Get('expired')
  @ApiOperation({ summary: 'Get expired vaccinations' })
  @ApiResponse({ status: 200, description: 'Expired vaccinations retrieved successfully' })
  async getExpiredVaccinations() {
    return this.vaccinationsService.findByStatus(VaccinationStatus.EXPIRED);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get vaccination statistics' })
  @ApiResponse({ status: 200, description: 'Vaccination statistics retrieved successfully' })
  async getStatistics() {
    return this.vaccinationsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vaccination by ID' })
  @ApiParam({ name: 'id', description: 'Vaccination ID' })
  @ApiResponse({ status: 200, description: 'Vaccination retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Vaccination not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vaccination = await this.vaccinationsService.findOne(id);
    if (!vaccination) {
      throw new HttpException('Vaccination not found', HttpStatus.NOT_FOUND);
    }
    return vaccination;
  }

  @Get(':id/certificate')
  @ApiOperation({ summary: 'Get vaccination certificate' })
  @ApiParam({ name: 'id', description: 'Vaccination ID' })
  @ApiResponse({ status: 200, description: 'Vaccination certificate retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Vaccination or certificate not found' })
  async getCertificate(@Param('id', ParseIntPipe) id: number) {
    const vaccination = await this.findOne(id); // This will throw 404 if not found
    return this.vaccinationsService.getCertificate(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vaccination record' })
  @ApiResponse({ status: 201, description: 'Vaccination created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createVaccinationDto: any) {
    return this.vaccinationsService.create(createVaccinationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vaccination record' })
  @ApiParam({ name: 'id', description: 'Vaccination ID' })
  @ApiResponse({ status: 200, description: 'Vaccination updated successfully' })
  @ApiResponse({ status: 404, description: 'Vaccination not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateVaccinationDto: any) {
    const existingVaccination = await this.findOne(id);
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vaccination record' })
  @ApiParam({ name: 'id', description: 'Vaccination ID' })
  @ApiResponse({ status: 200, description: 'Vaccination deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vaccination not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingVaccination = await this.findOne(id);
    await this.vaccinationsService.remove(id);
    return { message: 'Vaccination deleted successfully' };
  }
}