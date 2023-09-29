import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ColaboratorModule } from './colaborator/colaborator.module';

@Module({
  imports: [ColaboratorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
