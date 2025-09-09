import { PartialType } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @Allow()
  id?: number;
}