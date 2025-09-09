import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email);
    
    if (user) {
      // For now, if user exists and has a password, validate it
      if (user.password) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return null; // Invalid password
        }
      }
      
      // Return user without password
      const { password: hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, type: user.type };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        type: user.type,
        avatar: user.avatar,
        created_at: user.created_at,
        last_login: user.last_login,
        ...(user.type === 'veterinarian' && {
          clinic_name: user.clinic_name,
          clinic_address: user.clinic_address,
          license_number: user.license_number,
          specializations: user.specializations,
          working_hours: user.working_hours
        })
      },
      expires_in: '24h',
    };
  }

  async loginDemo(userType: 'owner' | 'veterinarian') {
    // For MVP demo purposes - get a demo user
    const demoUsers = await this.usersService.findByType(userType as any);
    const demoUser = demoUsers[0];
    
    if (!demoUser) {
      throw new Error(`No demo ${userType} available`);
    }

    return this.login(demoUser);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}