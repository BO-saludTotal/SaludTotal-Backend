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
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';


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
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida.'})
  fechaNacimiento?: string; 

  @IsOptional()
  @IsEnum(['Masculino', 'Femenino', 'Otro', 'PrefieroNoDecir'], { message: 'Género inválido.'})
  genero?: 'Masculino' | 'Femenino' | 'Otro' | 'PrefieroNoDecir';

  @IsOptional()
  @IsString()
  direccionResidencia?: string;

  @IsOptional()
  @IsString()
  nombresPadresTutores?: string;

  @IsOptional()
  @IsString()
  numeroColegiado?: string;

  @IsOptional() @IsString()
  cargoAdministrativo?: string;
  @IsOptional() @IsInt()
  entidadSaludIdAsignada?: number; 


  @IsOptional() @IsString()
  nombreInstitucionGubernamental?: string;
  @IsOptional() @IsString()
  cargoEnInstitucion?: string;


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
