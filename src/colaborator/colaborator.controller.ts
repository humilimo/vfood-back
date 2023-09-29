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

    const collaboratorMaxCategory = {};

    indicators.forEach((item) => {
      const currentCategory = collaboratorMaxCategory[item.colaborator.id] || 0;
      let newCategory = 0;

      if (item.progress >= item.indicator.desafio) newCategory = 3;
      else if (item.progress >= item.indicator.supermeta) newCategory = 2;
      else if (item.progress >= item.indicator.meta) newCategory = 1;

      collaboratorMaxCategory[item.colaborator.id] = Math.max(
        currentCategory,
        newCategory,
      );
    });

    const metas = [];
    const supermetas = [];
    const desafios = [];
    const noneCompleted = [];

    for (const colabId in collaboratorMaxCategory) {
      const colab = indicators.find(
        (ind) => ind.colaborator.id === +colabId,
      ).colaborator;

      if (collaboratorMaxCategory[colabId] === 0) {
        noneCompleted.push(colab);
      } else if (collaboratorMaxCategory[colabId] === 1) {
        metas.push(colab);
      } else if (collaboratorMaxCategory[colabId] === 2) {
        supermetas.push(colab);
      } else if (collaboratorMaxCategory[colabId] === 3) {
        desafios.push(colab);
      }
    }

    return {
      metas,
      supermetas,
      desafios,
      noneCompleted,
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
