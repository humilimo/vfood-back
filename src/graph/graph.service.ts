import { Injectable } from '@nestjs/common';
import { CreateGraphDto } from './dto/create-graph.dto';
import { UpdateGraphDto } from './dto/update-graph.dto';
import { PrismaService } from 'src/prisma.service';
import { of } from 'rxjs';

@Injectable()
export class GraphService {

  constructor(private readonly prisma: PrismaService) {}

  create(createGraphDto: CreateGraphDto) {
    return 'This action adds a new graph';
  }

  findAll() {
    return `This action returns all graph`;
  }

  async getIndicatorsByProgressMonthAndId(colaboratorIDs: number[]) {

    type MesesQuantidade = {
      [mes: string]: {
        [status: string]: number
      };
    };

    const fazer = await this.prisma.fazer.findMany({
      where: {
        colaboratorID: {
          in: colaboratorIDs
        }
      },
      select: {
        done: true,
        indicator: {
          select: {
            createdAt: true
          }
        }
      },
    });

    const mesesQuantidade: MesesQuantidade = {};
  
    for (const item of fazer) {
      const data = item.indicator.createdAt.getMonth() + 1;
      const status = item.done;
  
      if (!mesesQuantidade[data]) {
        mesesQuantidade[data] = {};
      }
  
      if (status in mesesQuantidade[data]) {
        mesesQuantidade[data][status] += 1;
      } else {
        mesesQuantidade[data][status] = 1;
      }
    }
  
    return mesesQuantidade;
    
  }

  async getAllIndicatorsByProgressAndMonth() {

    type MesesQuantidade = {
      [mes: string]: {
        [status: string]: number
      };
    };
  
    const fazer = await this.prisma.fazer.findMany({
      select: {
        done: true,
        indicator: true
      },
    });
  
    const mesesQuantidade: MesesQuantidade = {};
  
    for (const item of fazer) {
      const data = item.indicator.createdAt.getMonth();
      const status = item.done;
  
      if (!mesesQuantidade[data]) {
        mesesQuantidade[data] = {};
      }
  
      if (status in mesesQuantidade[data]) {
        mesesQuantidade[data][status] += 1;
      } else {
        mesesQuantidade[data][status] = 1;
      }
    }
  
    return mesesQuantidade;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} graph`;
  }

  update(id: number, updateGraphDto: UpdateGraphDto) {
    return `This action updates a #${id} graph`;
  }

  remove(id: number) {
    return `This action removes a #${id} graph`;
  }
}
