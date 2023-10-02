import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FazerService } from './fazer.service';
import { CreateFazerDto } from './dto/create-fazer.dto';
import { UpdateFazerDto } from './dto/update-fazer.dto';

@Controller('fazer')
export class FazerController {
  constructor(private readonly fazerService: FazerService) {}

  @Post()
  create(@Body() createFazerDto: CreateFazerDto) {
    return this.fazerService.create(createFazerDto);
  }

  @Get()
  findAll() {
    return this.fazerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fazerService.findOne(+id);
  }

  @Patch(':id_colaborator/:id_indicator')
  update(
    @Param('id_colaborator') id_colaborator: string,
    @Param('id_indicator') id_indicator: string,
    @Body() updateFazerDto: UpdateFazerDto
  ) {
    return this.fazerService.update(+id_colaborator, +id_indicator, updateFazerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fazerService.remove(+id);
  }
}
