import { Module } from '@nestjs/common';
import { FloodMarksService } from './flood_marks.service';
import { FloodMarksController } from './flood_marks.controller';

@Module({
  controllers: [FloodMarksController],
  providers: [FloodMarksService],
})
export class FloodMarksModule {}
