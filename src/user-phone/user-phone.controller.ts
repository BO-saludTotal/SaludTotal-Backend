import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPhoneService } from './user-phone.service';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';

@Controller('user-phone')
export class UserPhoneController {
  constructor(private readonly userPhoneService: UserPhoneService) {}

  @Post()
  create(@Body() createUserPhoneDto: CreateUserPhoneDto) {
    return this.userPhoneService.create(createUserPhoneDto);
  }

  @Get()
  findAll() {
    return this.userPhoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPhoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPhoneDto: UpdateUserPhoneDto) {
    return this.userPhoneService.update(+id, updateUserPhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPhoneService.remove(+id);
  }
}
