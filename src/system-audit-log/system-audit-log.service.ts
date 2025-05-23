import { Injectable } from '@nestjs/common';
import { CreateSystemAuditLogDto } from './dto/create-system-audit-log.dto';
import { UpdateSystemAuditLogDto } from './dto/update-system-audit-log.dto';

@Injectable()
export class SystemAuditLogService {
  create(createSystemAuditLogDto: CreateSystemAuditLogDto) {
    return 'This action adds a new systemAuditLog';
  }

  findAll() {
    return `This action returns all systemAuditLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemAuditLog`;
  }

  update(id: number, updateSystemAuditLogDto: UpdateSystemAuditLogDto) {
    return `This action updates a #${id} systemAuditLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemAuditLog`;
  }
}
