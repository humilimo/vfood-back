import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';

@Controller('colaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService) {}

  @Get('month-highlights')
  async monthHighlights() {
    const indicators =
      await this.colaboratorService.getIndicatorsForThisMonth();

    const metas = new Set();
    const supermetas = new Set();
    const desafios = new Set();
    const noneCompleted = new Set();

    indicators.forEach((indicator) => {
      const colaboratorId = indicator.colaborator.id;

      if (indicator.progress >= indicator.indicator.desafio) {
        if (!desafios.has(colaboratorId)) {
          desafios.add(colaboratorId);
        }
      } else if (indicator.progress >= indicator.indicator.supermeta) {
        if (!supermetas.has(colaboratorId)) {
          supermetas.add(colaboratorId);
        }
      } else if (indicator.progress >= indicator.indicator.meta) {
        if (!metas.has(colaboratorId)) {
          metas.add(colaboratorId);
        }
      } else if (indicator.progress < indicator.indicator.meta) {
        if (!noneCompleted.has(colaboratorId)) {
          noneCompleted.add(colaboratorId);
        }
      }
    });

    return {
      metas: Array.from(metas).map(
        (id) =>
          indicators.find((indicator) => indicator.colaborator.id === id)
            .colaborator,
      ),
      supermetas: Array.from(supermetas).map(
        (id) =>
          indicators.find((indicator) => indicator.colaborator.id === id)
            .colaborator,
      ),
      desafios: Array.from(desafios).map(
        (id) =>
          indicators.find((indicator) => indicator.colaborator.id === id)
            .colaborator,
      ),
      noneCompleted: Array.from(noneCompleted).map(
        (id) =>
          indicators.find((indicator) => indicator.colaborator.id === id)
            .colaborator,
      ),
    };
  }

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto) {
    return this.colaboratorService.create(createColaboratorDto);
  }

  @Get()
  findAll() {
    return this.colaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.colaboratorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateColaboratorDto: UpdateColaboratorDto,
  ) {
    return this.colaboratorService.update(+id, updateColaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.colaboratorService.remove(+id);
  }
}
