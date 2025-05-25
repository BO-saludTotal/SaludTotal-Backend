import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditActionTypeService } from './audit-action-type.service';
import { CreateAuditActionTypeDto } from './dto/create-audit-action-type.dto';
import { UpdateAuditActionTypeDto } from './dto/update-audit-action-type.dto';

@Controller('audit-action-type')
export class AuditActionTypeController {
  constructor(private readonly auditActionTypeService: AuditActionTypeService) {}

  @Post()
  create(@Body() createAuditActionTypeDto: CreateAuditActionTypeDto) {
    return this.auditActionTypeService.create(createAuditActionTypeDto);
  }

  @Get()
  findAll() {
    return this.auditActionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditActionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditActionTypeDto: UpdateAuditActionTypeDto) {
    return this.auditActionTypeService.update(+id, updateAuditActionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditActionTypeService.remove(+id);
  }
}
