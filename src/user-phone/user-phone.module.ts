import { Module } from '@nestjs/common';
import { UserPhoneService } from './user-phone.service';
import { UserPhoneController } from './user-phone.controller';

@Module({
  controllers: [UserPhoneController],
  providers: [UserPhoneService],
})
export class UserPhoneModule {}
