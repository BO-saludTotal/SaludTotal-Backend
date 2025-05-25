import { Injectable } from '@nestjs/common';
import { CreateAuditActionTypeDto } from './dto/create-audit-action-type.dto';
import { UpdateAuditActionTypeDto } from './dto/update-audit-action-type.dto';

@Injectable()
export class AuditActionTypeService {
  create(createAuditActionTypeDto: CreateAuditActionTypeDto) {
    return 'This action adds a new auditActionType';
  }

  findAll() {
    return `This action returns all auditActionType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditActionType`;
  }

  update(id: number, updateAuditActionTypeDto: UpdateAuditActionTypeDto) {
    return `This action updates a #${id} auditActionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditActionType`;
  }
}
