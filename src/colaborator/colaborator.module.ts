import { Module } from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { ColaboratorController } from './colaborator.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ColaboratorController],
  providers: [PrismaService, ColaboratorService],
})
export class ColaboratorModule {}
