import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ColaboratorModule } from './colaborator/colaborator.module';
import { GraphModule } from './graph/graph.module';
import { ScheduleModule } from '@nestjs/schedule';
import { IndicatorModule } from './indicator/indicator.module';
import { FazerModule } from './fazer/fazer.module';

@Module({
  imports: [
    ColaboratorModule,
    IndicatorModule,
    FazerModule,
    ScheduleModule.forRoot(),
    GraphModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
