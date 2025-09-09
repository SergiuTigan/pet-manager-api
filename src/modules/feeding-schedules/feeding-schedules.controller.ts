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
import { FeedingSchedulesService } from './feeding-schedules.service';
import { FoodType } from '@/common/interfaces';

@ApiTags('feeding-schedules')
@ApiBearerAuth('JWT-auth')
@Controller('feeding-schedules')
export class FeedingSchedulesController {
  constructor(private readonly feedingSchedulesService: FeedingSchedulesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all feeding schedules' })
  @ApiQuery({ name: 'petId', required: false, description: 'Filter by pet ID' })
  @ApiQuery({ name: 'foodType', required: false, enum: FoodType, description: 'Filter by food type' })
  @ApiResponse({ status: 200, description: 'List of feeding schedules retrieved successfully' })
  async findAll(
    @Query('petId') petId?: string,
    @Query('foodType') foodType?: FoodType,
  ) {
    if (petId) {
      return this.feedingSchedulesService.findByPetId(parseInt(petId));
    }
    
    if (foodType) {
      return this.feedingSchedulesService.findByFoodType(foodType);
    }

    return this.feedingSchedulesService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get feeding schedule statistics' })
  @ApiResponse({ status: 200, description: 'Feeding schedule statistics retrieved successfully' })
  getStatistics() {
    return this.feedingSchedulesService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feeding schedule by ID' })
  @ApiParam({ name: 'id', description: 'Feeding schedule ID' })
  @ApiResponse({ status: 200, description: 'Feeding schedule retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Feeding schedule not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const schedule = await this.feedingSchedulesService.findOne(id);
    if (!schedule) {
      throw new HttpException('Feeding schedule not found', HttpStatus.NOT_FOUND);
    }
    return schedule;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new feeding schedule' })
  @ApiResponse({ status: 201, description: 'Feeding schedule created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createScheduleDto: any) {
    return this.feedingSchedulesService.create(createScheduleDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a feeding schedule' })
  @ApiParam({ name: 'id', description: 'Feeding schedule ID' })
  @ApiResponse({ status: 200, description: 'Feeding schedule updated successfully' })
  @ApiResponse({ status: 404, description: 'Feeding schedule not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateScheduleDto: any) {
    const existingSchedule = await this.findOne(id);
    return this.feedingSchedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feeding schedule' })
  @ApiParam({ name: 'id', description: 'Feeding schedule ID' })
  @ApiResponse({ status: 200, description: 'Feeding schedule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Feeding schedule not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingSchedule = await this.findOne(id);
    return this.feedingSchedulesService.remove(id);
  }

  @Post(':id/feeding-note')
  @ApiOperation({ summary: 'Add a feeding note' })
  @ApiParam({ name: 'id', description: 'Feeding schedule ID' })
  @ApiResponse({ status: 201, description: 'Feeding note added successfully' })
  async addFeedingNote(@Param('id', ParseIntPipe) id: number, @Body() feedingNoteDto: any) {
    return this.feedingSchedulesService.addFeedingNote(id, feedingNoteDto);
  }

  @Get(':id/recommendations')
  @ApiOperation({ summary: 'Get feeding recommendations for a schedule' })
  @ApiParam({ name: 'id', description: 'Feeding schedule ID' })
  @ApiResponse({ status: 200, description: 'Feeding recommendations retrieved successfully' })
  async getRecommendations(@Param('id', ParseIntPipe) id: number) {
    return this.feedingSchedulesService.getRecommendations(id);
  }
}