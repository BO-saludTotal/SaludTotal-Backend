import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAdressDto } from './create-user-adress.dto';

export class UpdateUserAdressDto extends PartialType(CreateUserAdressDto) {}
