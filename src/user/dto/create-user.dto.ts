import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

// import { UserPhoneDto } from './user-phone.dto'; // Si tienes DTOs específicos
// import { UserEmailDto } from './user-email.dto';

class CreateUserPhoneDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(['Móvil', 'Casa', 'Trabajo'])
  phoneType?: 'Móvil' | 'Casa' | 'Trabajo';

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

class CreateUserEmailDto {
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es requerido.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'El nombre completo es requerido.' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'Se debe asignar al menos un rol.' })
  @IsInt({ message: 'El ID del rol debe ser un número válido.' })
  roleId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserPhoneDto)
  phones?: CreateUserPhoneDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserEmailDto)
  emails?: CreateUserEmailDto[];
}
