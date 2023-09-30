import { Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ColaboratorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateColaboratorDto){
    // const existingColaborator = await this.prisma.colaborator.findFirst({
    //     where: {
    //         id: data.id 
    //     }
    // });
    // if (existingColaborator) {
    //     throw new Error('Já existe um colaborador com o mesmo ID.');
    // }
    return this.prisma.colaborator.create({
        data,
    });
}

  findAll() {
    return this.prisma.colaborator.findMany();
  }

  async findOne(id: number, month: number, year: number) {
    const colaborator = await this.prisma.colaborator.findUniqueOrThrow({
      where: { id },
      include: {
        Fazer: {
          include: {
            indicator: true,
          },
        },
      },
    });

    const currentDateIndicators = colaborator.Fazer.filter((fazer) => {
      const indicatorDate = new Date(fazer.indicator.createdAt);
      return (
        indicatorDate.getMonth() + 1 === month &&
        indicatorDate.getFullYear() === year
      );
    });

    const metas = [];
    const supermetas = [];
    const desafios = [];
    const notCompleted = [];

    currentDateIndicators.forEach((fazer) => {
      if (fazer.progress >= fazer.indicator.desafio) {
        desafios.push(fazer);
      } else if (fazer.progress >= fazer.indicator.supermeta) {
        supermetas.push(fazer);
      } else if (fazer.progress >= fazer.indicator.meta) {
        metas.push(fazer);
      } else {
        notCompleted.push(fazer);
      }
    });

    return {
      id: colaborator.id,
      name: colaborator.name,
      indicators: currentDateIndicators.map((fazer) => fazer.indicator),
      metas,
      supermetas,
      desafios,
      notCompleted,
    };
  }

  update(id: number, updateColaboratorDto: UpdateColaboratorDto) {
    return `This action updates a #${id} colaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaborator`;
  }
}
