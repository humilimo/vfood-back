import { Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ColaboratorService {
  constructor(private prisma: PrismaService) {}

  create(createColaboratorDto: CreateColaboratorDto) {
    return 'This action adds a new colaborator';
  }

  findAll() {
    return `This action returns all colaborator`;
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
      area: colaborator.area,
      grade: colaborator.grade,
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

  async getIndicatorsForThisMonth() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const indicators = await this.prisma.fazer.findMany({
      where: {
        indicator: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      },
      include: {
        colaborator: true,
        indicator: true,
      },
    });

    return indicators;
  }
}
