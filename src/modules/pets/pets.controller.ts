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
import { PetsService } from './pets.service';
import { CreatePetDto, UpdatePetDto } from '@/common/dto';
import { Pet, PetSpecies } from '@/common/interfaces';

@ApiTags('pets')
@ApiBearerAuth('JWT-auth')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiQuery({ name: 'ownerId', required: false, description: 'Filter by owner ID' })
  @ApiQuery({ name: 'species', required: false, enum: PetSpecies, description: 'Filter by species' })
  @ApiQuery({ name: 'search', required: false, description: 'Search pets by name, breed, or microchip' })
  @ApiResponse({ status: 200, description: 'List of pets retrieved successfully' })
  async findAll(
    @Query('ownerId') ownerId?: string,
    @Query('species') species?: PetSpecies,
    @Query('search') search?: string,
  ) {
    if (search) {
      return this.petsService.searchPets(search);
    }
    
    if (ownerId) {
      return this.petsService.findByOwnerId(parseInt(ownerId));
    }
    
    if (species) {
      return this.petsService.findBySpecies(species);
    }

    return this.petsService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get pet statistics' })
  @ApiResponse({ status: 200, description: 'Pet statistics retrieved successfully' })
  async getStatistics() {
    return this.petsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const pet = await this.petsService.findOne(id);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    return pet;
  }

  @Get(':id/vaccinations')
  @ApiOperation({ summary: 'Get vaccinations for a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet vaccinations retrieved successfully' })
  async getPetVaccinations(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.getPetVaccinations(id);
  }

  @Get(':id/consultations')
  @ApiOperation({ summary: 'Get consultations for a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet consultations retrieved successfully' })
  async getPetConsultations(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.getPetConsultations(id);
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Get documents for a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet documents retrieved successfully' })
  async getPetDocuments(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.getPetDocuments(id);
  }

  @Get(':id/feeding-schedule')
  @ApiOperation({ summary: 'Get feeding schedule for a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet feeding schedule retrieved successfully' })
  async getPetFeedingSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.petsService.getPetFeedingSchedule(id);
  }

  @Get(':id/health-summary')
  @ApiOperation({ summary: 'Get comprehensive health summary for a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet health summary retrieved successfully' })
  async getPetHealthSummary(@Param('id', ParseIntPipe) id: number) {
    const pet = await this.findOne(id); // This will throw 404 if not found
    return this.petsService.getHealthSummary(id);
  }

  @Post()
  @ApiOperation({ 
    summary: '🐾 Create a New Pet Profile',
    description: `
**Add a new pet to the system with comprehensive health information.**

Required fields:
- **name**: Pet's name
- **species**: Type of animal (Dog, Cat, Rabbit, Bird, Other)  
- **breed**: Specific breed information
- **gender**: Male or Female

Optional but recommended:
- **birth_date**: For age calculations and vaccination schedules
- **weight**: For medication dosing and health monitoring
- **microchip**: For identification and lost pet recovery
- **emergency_contact**: Important for veterinary emergencies

💡 **Tip**: Complete profiles help vets provide better care!
    `
  })
  @ApiBody({
    type: CreatePetDto,
    examples: {
      dog: {
        summary: '🐕 Complete Dog Profile',
        description: 'Golden Retriever with full health information',
        value: {
          name: 'Max',
          species: 'Câine',
          breed: 'Golden Retriever',
          gender: 'Masculin',
          birth_date: '2021-03-12',
          weight: 32.5,
          microchip: 'RO642123456789012',
          color: 'Auriu',
          photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
          is_neutered: false,
          medical_conditions: ['Displazia de șold ușoară'],
          allergies: ['Pui'],
          notes: 'Foarte prietenos cu copiii. Iubește să înoate.',
          emergency_contact: {
            name: 'Maria Popescu',
            phone: '+40722123456',
            relationship: 'Proprietară'
          }
        }
      },
      cat: {
        summary: '🐱 Basic Cat Profile',
        description: 'Minimal required information for a cat',
        value: {
          name: 'Luna',
          species: 'Pisică',
          breed: 'Pisică Persană',
          gender: 'Feminin',
          birth_date: '2022-07-08',
          weight: 4.2,
          color: 'Alb cu gri',
          is_neutered: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: '✅ Pet profile created successfully',
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 7 },
            name: { type: 'string', example: 'Max' },
            species: { type: 'string', example: 'Câine' },
            breed: { type: 'string', example: 'Golden Retriever' },
            gender: { type: 'string', example: 'Masculin' },
            birth_date: { type: 'string', example: '2021-03-12' },
            weight: { type: 'number', example: 32.5 },
            is_active: { type: 'boolean', example: true },
            created_at: { type: 'string', example: '2025-09-01T16:15:00Z' }
          }
        },
        timestamp: { type: 'string', example: '2025-09-01T16:15:00Z' },
        path: { type: 'string', example: '/api/pets' },
        message: { type: 'string', example: 'Pet created successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: '❌ Invalid input data - check required fields',
    schema: {
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Validation failed' },
        details: { 
          type: 'array',
          items: { type: 'string' },
          example: ['name should not be empty', 'species must be a valid enum value']
        },
        statusCode: { type: 'number', example: 400 },
        timestamp: { type: 'string', example: '2025-09-01T16:15:00Z' },
        path: { type: 'string', example: '/api/pets' }
      }
    }
  })
  async create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet updated successfully' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePetDto: UpdatePetDto) {
    const existingPet = await this.findOne(id); // This will throw 404 if not found
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingPet = await this.findOne(id); // This will throw 404 if not found
    await this.petsService.remove(id);
    return { message: 'Pet deleted successfully' };
  }
}