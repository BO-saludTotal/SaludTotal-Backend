import { IsString, IsNotEmpty, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { HealthEntityType } from 'src/entity/healthEntity';

export class CreateHealthEntityDto {
  @IsNotEmpty({ message: 'El nombre oficial es requerido.' })
  @IsString()
  @MaxLength(255)
  officialName: string;

  @IsNotEmpty({ message: 'El tipo de entidad es requerido.' })
  //@IsEnum(HealthEntityType, { message: 'Tipo de entidad inválido.' }) 
  entityType: HealthEntityType;

  @IsOptional()
  @IsString()
  fullAddress?: string;
}