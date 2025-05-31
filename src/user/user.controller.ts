import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe, 
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards, 
  Query
} from '@nestjs/common';
import { UsersService } from './user.service'; 
import { UpdateUserDto } from './dto/update-user.dto'; 
import { SearchUserQueryDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AllowedRoles } from '../auth/enums/allowed-roles.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  @Roles(AllowedRoles.Medico, AllowedRoles.Administrativo) 
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async searchUsers(@Query() queryDto: SearchUserQueryDto) {
    return this.usersService.search(queryDto);
  }

  @Get()
  @Roles(AllowedRoles.Administrativo) 
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(AllowedRoles.Medico, AllowedRoles.Administrativo) 
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(AllowedRoles.Administrativo) 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, skipMissingProperties: true }))
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(AllowedRoles.Administrativo) 
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
 
}
