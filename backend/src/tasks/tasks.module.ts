import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloodMark } from 'src/database/entities/flood_marks/entities/flood_mark.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FloodMark]),
  ],
  providers: [TasksService],
})
export class TasksModule {}