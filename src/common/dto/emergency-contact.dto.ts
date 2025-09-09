import { IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmergencyContactDto {
  @ApiProperty({ 
    description: 'Emergency contact name', 
    example: 'Maria Popescu' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Emergency contact phone number', 
    example: '+40723456789' 
  })
  @IsString() // Could use @IsPhoneNumber('RO') for Romanian numbers
  phone: string;

  @ApiProperty({ 
    description: 'Relationship to pet owner', 
    example: 'Soție' 
  })
  @IsString()
  relationship: string;
}