import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccountStatusType } from 'src/entity/user';

export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  NumeroTelefono: string;

  @IsOptional()
  @IsString()
  TipoTelefono?: string;

  @IsOptional()
  EsPrincipal?: boolean;
}

export class CreateAddressDto {
  @IsEmail()
  CorreoElectronico: string;

  @IsOptional()
  EsPrincipal?: boolean;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  NombreUsuario: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  Contrasena: string;

  @IsString()
  @IsNotEmpty()
  NombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  RolID: string;

  @IsOptional()
  @IsEnum(['Activo', 'Inactivo', 'Bloqueado', 'PendienteVerificacion'])
  EstadoCuenta?: AccountStatusType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  Telefonos?: CreatePhoneDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  Correos?: CreateAddressDto[];
}
