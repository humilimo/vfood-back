import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GraphController],
  providers: [PrismaService, GraphService],
})
export class GraphModule {}
