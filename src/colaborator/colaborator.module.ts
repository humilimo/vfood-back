import { Module } from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { ColaboratorController } from './colaborator.controller';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from './tasksService';

@Module({
  controllers: [ColaboratorController],
  providers: [PrismaService, ColaboratorService, TasksService],
})
export class ColaboratorModule {}
