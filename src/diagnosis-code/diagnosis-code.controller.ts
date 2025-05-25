import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisCodeService } from './diagnosis-code.service';
import { CreateDiagnosisCodeDto } from './dto/create-diagnosis-code.dto';
import { UpdateDiagnosisCodeDto } from './dto/update-diagnosis-code.dto';

@Controller('diagnosis-code')
export class DiagnosisCodeController {
  constructor(private readonly diagnosisCodeService: DiagnosisCodeService) {}

  @Post()
  create(@Body() createDiagnosisCodeDto: CreateDiagnosisCodeDto) {
    return this.diagnosisCodeService.create(createDiagnosisCodeDto);
  }

  @Get()
  findAll() {
    return this.diagnosisCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosisCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosisCodeDto: UpdateDiagnosisCodeDto) {
    return this.diagnosisCodeService.update(+id, updateDiagnosisCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosisCodeService.remove(+id);
  }
}
