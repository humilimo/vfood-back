import { Module } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { IndicatorController } from './indicator.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IndicatorController],
  providers: [PrismaService, IndicatorService],
})
export class IndicatorModule {}
