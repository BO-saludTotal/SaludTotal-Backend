
import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  ParseUUIDPipe, // Para validar que el ID es un UUID
  UsePipes, ValidationPipe,
  HttpCode, HttpStatus,
  UseGuards // Para proteger rutas
} from '@nestjs/common';
import { UsersService } from './user.service'; // Ajusta la ruta
import { CreateUserDto } from './dto/create-user.dto'; // Ajusta la ruta
import { UpdateUserDto } from './dto/update-user.dto'; // Ajusta la ruta
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Cuando tengas auth
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { AllowedRoles } from '../auth/enums/allowed-roles.enum';

@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get()

  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')

  findOne(@Param('id', ParseUUIDPipe) id: string) { 
    return this.usersService.findOne(id);
  }

  @Patch(':id')

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, skipMissingProperties: true }))
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')

  @HttpCode(HttpStatus.OK) 
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}