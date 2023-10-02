import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ColaboratorService } from './colaborator.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly colaboratorService: ColaboratorService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) //mudar para segundos para realizar testes
  handleCron() {
    this.logger.debug(
      'updated all grades at every 1s day of month at midnight',
    );

    this.colaboratorService.updateAllGrades();
  }
}
