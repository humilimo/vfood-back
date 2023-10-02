import { Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
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
    const grade = this.calcColaboratorGrade(colaborator, month, year);

    return {
      id: colaborator.id,
      name: colaborator.name,
      area: colaborator.area,
      grade: grade,
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

  async updateAllGrades() {
    const colaborators = await this.prisma.colaborator.findMany({
      include: {
        Fazer: {
          include: {
            indicator: true,
          },
        },
      },
    });

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    for (const colaborator of colaborators) {
      const grade = this.calcColaboratorGrade(colaborator, month, year);
      if (grade) {
        await this.prisma.colaborator.update({
          where: { id: colaborator.id },
          data: { grade: grade },
        });
      }
    }
  }

  private calcColaboratorGrade(colaborator, month, year) {
    const date = new Date();
    if (month === date.getMonth() + 1) {
      month = month - 1;
    }
    const currentDateIndicators = colaborator.Fazer.filter((fazer) => {
      const indicatorDate = new Date(fazer.indicator.createdAt);
      return (
        indicatorDate.getMonth() + 1 === month &&
        indicatorDate.getFullYear() === year
      );
    });

    let gradeForIndicator = 0;

    currentDateIndicators.forEach((fazer) => {
      if (fazer.progress >= fazer.indicator.desafio) {
        gradeForIndicator += 5 * fazer.indicator.weight;
      } else if (fazer.progress >= fazer.indicator.supermeta) {
        gradeForIndicator += 4 * fazer.indicator.weight;
      } else if (fazer.progress >= fazer.indicator.meta) {
        gradeForIndicator += 3 * fazer.indicator.weight;
      }
    });

    const grade = Number(gradeForIndicator.toFixed(1));

    if (grade >= 5) return 5;
    return grade;
  }
}
