import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';

@Controller('colaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService) {}

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto) {
    return this.colaboratorService.create(createColaboratorDto);
  }

  @Get()
  findAll() {
    return this.colaboratorService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const targetMonth = month ? parseInt(month) : currentMonth;
    const targetYear = year ? parseInt(year) : currentYear;

    return this.colaboratorService.findOne(+id, targetMonth, targetYear);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColaboratorDto: UpdateColaboratorDto,
  ) {
    return this.colaboratorService.update(+id, updateColaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colaboratorService.remove(+id);
  }
}
