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

  findOne(id: number) {
    return `This action returns a #${id} colaborator`;
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

    return this.prisma.fazer.findMany({
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
  }
}
