import { PartialType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsEmpty({ message: 'property id should not exist' })
  id?: never;
}