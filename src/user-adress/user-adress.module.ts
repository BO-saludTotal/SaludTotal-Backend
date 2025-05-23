import { Module } from '@nestjs/common';
import { UserAdressService } from './user-adress.service';
import { UserAdressController } from './user-adress.controller';

@Module({
  controllers: [UserAdressController],
  providers: [UserAdressService],
})
export class UserAdressModule {}
