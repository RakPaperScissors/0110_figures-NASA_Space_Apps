import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { FloodMark } from 'src/database/entities/flood_marks/entities/flood_mark.entity';
import { MarkStatus } from '../database/enums/mark-status.enum';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(FloodMark)
    private readonly floodMarksRepository: Repository<FloodMark>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleExpiredFloodMarks() {
    this.logger.log('Running cron job to clean up expired flood marks...');
    
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const expiredMarks = await this.floodMarksRepository.find({
      where: {
        status: MarkStatus.ACTIVE,
        updatedAt: LessThan(twoHoursAgo),
      },
    });

    if (expiredMarks.length > 0) {
      await this.floodMarksRepository.remove(expiredMarks);
      this.logger.log(`Successfully deleted ${expiredMarks.length} expired flood marks.`);
    } else {
      this.logger.log('No expired flood marks to delete.');
    }
  }
}