import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Pet } from '@/entities/pet.entity';
import { Consultation } from '@/entities/consultation.entity';
import { Vaccination } from '@/entities/vaccination.entity';
import { Notification } from '@/entities/notification.entity';
import { UserType } from '@/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Omit<User, 'preferences'>[]> {
    const users = await this.userRepository.find({
      order: { created_at: 'DESC' },
    });
    return users.map(user => this.sanitizeUser(user));
  }

  async findOne(id: number): Promise<Omit<User, 'preferences'> | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? this.sanitizeUser(user) : null;
  }

  async findByEmail(email: string): Promise<Omit<User, 'preferences'> | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? this.sanitizeUser(user) : null;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'name', 'phone', 'type', 'avatar', 'created_at', 'last_login', 'password', 'clinic_name', 'clinic_address', 'license_number', 'specializations', 'working_hours']
    });
  }

  async findByType(type: UserType): Promise<Omit<User, 'preferences'>[]> {
    const users = await this.userRepository.find({
      where: { type },
      order: { created_at: 'DESC' },
    });
    return users.map(user => this.sanitizeUser(user));
  }

  async searchUsers(query: string): Promise<Omit<User, 'preferences'>[]> {
    const users = await this.userRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
      ],
      order: { created_at: 'DESC' },
    });
    return users.map(user => this.sanitizeUser(user));
  }

  async getUserPets(userId: number) {
    return this.petRepository.find({
      where: { owner_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async getUserNotifications(userId: number) {
    return this.notificationRepository.find({
      where: { user_id: userId },
      relations: ['pet'],
      order: { created_at: 'DESC' },
    });
  }

  async getUnreadNotifications(userId: number) {
    return this.notificationRepository.find({
      where: { user_id: userId, is_read: false },
      relations: ['pet'],
      order: { created_at: 'DESC' },
    });
  }

  async getDashboardData(userId: number) {
    const user = await this.findOneWithPreferences(userId);
    if (!user) return null;

    const pets = await this.getUserPets(userId);
    const notifications = await this.getUnreadNotifications(userId);
    const consultations = await this.consultationRepository.find({
      where: { pet: { owner_id: userId } },
      relations: ['pet', 'veterinarian'],
      order: { appointment_date: 'DESC' },
      take: 5,
    });

    const upcomingConsultations = consultations.filter(c => {
      return new Date(c.appointment_date) > new Date() && c.status !== 'cancelled';
    });

    return {
      user: this.sanitizeUser(user),
      pets_count: pets.length,
      active_pets: pets.filter(p => p.is_active).length,
      unread_notifications: notifications.length,
      upcoming_consultations: upcomingConsultations.length,
      recent_consultations: consultations.slice(0, 3),
      pets: pets.slice(0, 6), // Show first 6 pets
      urgent_notifications: notifications.filter(n => n.priority === 'urgent'),
    };
  }

  async getVetConsultations(vetId: number, status?: string) {
    const whereCondition: any = { vet_id: vetId };
    if (status) {
      whereCondition.status = status;
    }

    return this.consultationRepository.find({
      where: whereCondition,
      relations: ['pet'],
      order: { appointment_date: 'DESC' },
    });
  }

  async getVetVaccinations(vetId: number) {
    return this.vaccinationRepository.find({
      where: { administered_by_vet_id: vetId },
      relations: ['pet'],
      order: { date_administered: 'DESC' },
    });
  }

  async getStatistics() {
    const users = await this.userRepository.find();
    const owners = users.filter(user => user.type === UserType.OWNER);
    const vets = users.filter(user => user.type === UserType.VETERINARIAN);

    const vetSpecializations = vets.reduce((acc, vet) => {
      if (vet.specializations) {
        vet.specializations.forEach(spec => {
          acc[spec] = (acc[spec] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    const recentLogins = users.filter(user => {
      const lastLogin = new Date(user.last_login);
      const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceLogin <= 7;
    }).length;

    return {
      total_users: users.length,
      owners: {
        count: owners.length,
        with_multiple_pets: await this.getOwnersWithMultiplePets(owners),
      },
      veterinarians: {
        count: vets.length,
        specializations: vetSpecializations,
        with_working_hours: vets.filter(vet => vet.working_hours).length,
      },
      activity: {
        recent_logins: recentLogins,
        active_percentage: Math.round((recentLogins / users.length) * 100),
      },
    };
  }

  // Helper method to remove sensitive information
  private sanitizeUser(user: User): Omit<User, 'preferences'> {
    const { preferences, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  // Method to get full user data (for authentication/internal use)
  async findOneWithPreferences(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Helper method to count owners with multiple pets
  private async getOwnersWithMultiplePets(owners: User[]): Promise<number> {
    let count = 0;
    for (const owner of owners) {
      const petCount = await this.petRepository.count({ where: { owner_id: owner.id } });
      if (petCount > 1) count++;
    }
    return count;
  }

  async create(createUserDto: any): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return (await this.userRepository.save(user)) as unknown as User;
  }

  async update(id: number, updateUserDto: any): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneWithPreferences(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}