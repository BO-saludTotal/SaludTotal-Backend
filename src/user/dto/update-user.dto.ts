
import { IsString, IsEmail, MinLength, IsEnum, IsOptional, IsArray, ValidateNested, IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { AccountStatusType } from 'src/entity/user';


class UpdateUserPhoneDto {
  @IsOptional() 
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(['Móvil', 'Casa', 'Trabajo'])
  phoneType?: 'Móvil' | 'Casa' | 'Trabajo';

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

class UpdateUserEmailDto {
  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional() 
  @IsBoolean()
  isVerified?: boolean;
}


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEnum(['Activo', 'Inactivo', 'Bloqueado', 'PendienteVerificacion'])
  accountStatus?: AccountStatusType;



  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserPhoneDto)
  phones?: UpdateUserPhoneDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserEmailDto)
  emails?: UpdateUserEmailDto[];
}