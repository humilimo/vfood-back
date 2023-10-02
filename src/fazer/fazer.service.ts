import { Injectable } from '@nestjs/common';
import { CreateFazerDto } from './dto/create-fazer.dto';
import { UpdateFazerDto } from './dto/update-fazer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FazerService {
  constructor(private prisma: PrismaService) {}
  async create(createFazerDto: CreateFazerDto) {
    return this.prisma.fazer.create({ 
      data: {
        colaborator: { 
          connect: { 
            id: createFazerDto.colaborator 
          } 
        },
        indicator: { 
          connect: { 
            id: createFazerDto.indicator 
          } 
        }
      }
    });
  }

  findAll() {
    return `This action returns all fazer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fazer`;
  }

  update(id_colaborator: number, id_indicator: number, updateFazerDto: UpdateFazerDto) {
    return this.prisma.fazer.update({
      where: {
        colaboratorID_indicatorID: {
          colaboratorID: id_colaborator,
          indicatorID: id_indicator,
        },
      },
      data: {
        progress: updateFazerDto.progress,
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} fazer`;
  }
}
