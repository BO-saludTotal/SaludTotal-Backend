import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemAuditLogService } from './system-audit-log.service';
import { CreateSystemAuditLogDto } from './dto/create-system-audit-log.dto';
import { UpdateSystemAuditLogDto } from './dto/update-system-audit-log.dto';

@Controller('system-audit-log')
export class SystemAuditLogController {
  constructor(private readonly systemAuditLogService: SystemAuditLogService) {}

  @Post()
  create(@Body() createSystemAuditLogDto: CreateSystemAuditLogDto) {
    return this.systemAuditLogService.create(createSystemAuditLogDto);
  }

  @Get()
  findAll() {
    return this.systemAuditLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemAuditLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemAuditLogDto: UpdateSystemAuditLogDto) {
    return this.systemAuditLogService.update(+id, updateSystemAuditLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemAuditLogService.remove(+id);
  }
}
