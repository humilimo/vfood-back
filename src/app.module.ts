import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ColaboratorModule } from './colaborator/colaborator.module';
import { IndicatorModule } from './indicator/indicator.module';

@Module({
  imports: [ColaboratorModule, IndicatorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
