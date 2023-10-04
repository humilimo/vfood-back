import { Injectable } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IndicatorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.indicator.findMany();
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
