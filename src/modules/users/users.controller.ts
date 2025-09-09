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
import { UsersService } from './users.service';
import { User, UserType } from '@/common/interfaces';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'type', required: false, enum: UserType, description: 'Filter by user type' })
  @ApiQuery({ name: 'search', required: false, description: 'Search users by name or email' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
  async findAll(
    @Query('type') type?: UserType,
    @Query('search') search?: string,
  ) {
    if (search) {
      return this.usersService.searchUsers(search);
    }
    
    if (type) {
      return this.usersService.findByType(type);
    }

    return this.usersService.findAll();
  }

  @Get('owners')
  @ApiOperation({ summary: 'Get all pet owners' })
  @ApiResponse({ status: 200, description: 'List of pet owners retrieved successfully' })
  async getOwners() {
    return this.usersService.findByType(UserType.OWNER);
  }

  @Get('veterinarians')
  @ApiOperation({ summary: 'Get all veterinarians' })
  @ApiResponse({ status: 200, description: 'List of veterinarians retrieved successfully' })
  async getVeterinarians() {
    return this.usersService.findByType(UserType.VETERINARIAN);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({ status: 200, description: 'User statistics retrieved successfully' })
  async getStatistics() {
    return this.usersService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get(':id/pets')
  @ApiOperation({ summary: 'Get pets owned by user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User pets retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserPets(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findOne(id); // This will throw 404 if not found
    return this.usersService.getUserPets(id);
  }

  @Get(':id/notifications')
  @ApiOperation({ summary: 'Get notifications for user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiQuery({ name: 'unread', required: false, description: 'Filter unread notifications' })
  @ApiResponse({ status: 200, description: 'User notifications retrieved successfully' })
  async getUserNotifications(
    @Param('id', ParseIntPipe) id: number,
    @Query('unread') unread?: string,
  ) {
    const user = await this.findOne(id); // This will throw 404 if not found
    
    if (unread === 'true') {
      return this.usersService.getUnreadNotifications(id);
    }
    
    return this.usersService.getUserNotifications(id);
  }

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Get dashboard data for user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getDashboardData(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findOne(id); // This will throw 404 if not found
    return this.usersService.getDashboardData(id);
  }

  // Veterinarian-specific endpoints
  @Get(':id/consultations')
  @ApiOperation({ summary: 'Get consultations for veterinarian' })
  @ApiParam({ name: 'id', description: 'Veterinarian ID' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by consultation status' })
  @ApiResponse({ status: 200, description: 'Veterinarian consultations retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Veterinarian not found' })
  async getVetConsultations(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status?: string,
  ) {
    const user = await this.findOne(id); // This will throw 404 if not found
    
    if (user.type !== UserType.VETERINARIAN) {
      throw new HttpException('User is not a veterinarian', HttpStatus.BAD_REQUEST);
    }
    
    return this.usersService.getVetConsultations(id, status);
  }

  @Get(':id/vaccinations-administered')
  @ApiOperation({ summary: 'Get vaccinations administered by veterinarian' })
  @ApiParam({ name: 'id', description: 'Veterinarian ID' })
  @ApiResponse({ status: 200, description: 'Vaccinations administered retrieved successfully' })
  async getVetVaccinations(@Param('id', ParseIntPipe) id: number) {
    const user = await this.findOne(id); // This will throw 404 if not found
    
    if (user.type !== UserType.VETERINARIAN) {
      throw new HttpException('User is not a veterinarian', HttpStatus.BAD_REQUEST);
    }
    
    return this.usersService.getVetVaccinations(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: any) {
    const existingUser = await this.findOne(id);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingUser = await this.findOne(id);
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}