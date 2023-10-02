import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ColaboratorModule } from './colaborator/colaborator.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ColaboratorModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
