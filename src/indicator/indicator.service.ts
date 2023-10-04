import { Injectable } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { PrismaService } from 'src/prisma.service';
import { startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class IndicatorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    const now = new Date();
    const startOfThisMonth = startOfMonth(now);
    const endOfThisMonth = endOfMonth(now);

    return this.prisma.indicator.findMany({
      where: {
        createdAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    });
  }

  async create(createIndicatorDto: CreateIndicatorDto) {
    return this.prisma.indicator.create({ data: createIndicatorDto });
  }

  async update(id: number, updateIndicatorDto: UpdateIndicatorDto) {
    return this.prisma.indicator.update({
      where: { id },
      data: updateIndicatorDto,
    });
  }
}
