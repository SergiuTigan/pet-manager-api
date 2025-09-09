import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  OWNER = 'owner',
  VETERINARIAN = 'veterinarian'
}

export class DemoLoginDto {
  @ApiProperty({ 
    enum: UserType,
    description: 'Type of user for demo login',
    example: UserType.OWNER
  })
  @IsEnum(UserType)
  userType: UserType;
}