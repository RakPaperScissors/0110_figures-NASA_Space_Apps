import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloodMarksService } from './flood_marks.service';
import { FloodMarksController } from './flood_marks.controller';
import { FloodMark } from './entities/flood_mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FloodMark])],
  controllers: [FloodMarksController],
  providers: [FloodMarksService],
  exports: [TypeOrmModule],
})
export class FloodMarksModule {}
