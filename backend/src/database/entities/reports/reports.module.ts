import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Post } from '../posts/entities/post.entity';
import { FloodMark } from '../flood_marks/entities/flood_mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Post, FloodMark])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports:[ReportsService]
})
export class ReportsModule {}
