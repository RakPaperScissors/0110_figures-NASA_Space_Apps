import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloodMarksService } from './flood_marks.service';
import { FloodMarksController } from './flood_marks.controller';
import { FloodMark } from './entities/flood_mark.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([FloodMark, TasksService])],
  controllers: [FloodMarksController],
  providers: [FloodMarksService],
  exports: [FloodMarksService],
})
export class FloodMarksModule {}
