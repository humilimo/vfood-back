import { Module } from '@nestjs/common';
import { FazerService } from './fazer.service';
import { FazerController } from './fazer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FazerController],
  providers: [FazerService, PrismaService],
})
export class FazerModule {}
