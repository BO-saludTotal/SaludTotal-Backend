import { IsNotEmpty, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateExamResultParameterDto {
  @IsNotEmpty({ message: 'El ID del parámetro del examen es requerido.'})
  @IsInt({ message: 'El ID del parámetro del examen debe ser un número.'})
  examParameterId: number; 

  @IsNotEmpty({ message: 'El valor obtenido es requerido.'})
  @IsString()
  @MaxLength(255)
  obtainedValue: string;
}