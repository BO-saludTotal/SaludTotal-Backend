import { Injectable } from '@nestjs/common';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';

@Injectable()
export class UserPhoneService {
  create(createUserPhoneDto: CreateUserPhoneDto) {
    return 'This action adds a new userPhone';
  }

  findAll() {
    return `This action returns all userPhone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPhone`;
  }

  update(id: number, updateUserPhoneDto: UpdateUserPhoneDto) {
    return `This action updates a #${id} userPhone`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPhone`;
  }
}
