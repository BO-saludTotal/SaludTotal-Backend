import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El nombre de usuario es requerido.'})
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'La contraseña es requerida.'})
  @IsString()
  passwordHash: string;
}