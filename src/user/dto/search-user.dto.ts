
import { IsString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class SearchUserQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1) 
  query?: string; 


  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

}
