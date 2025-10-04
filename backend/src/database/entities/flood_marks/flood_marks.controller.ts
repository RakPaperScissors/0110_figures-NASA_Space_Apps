import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FloodMarksService } from './flood_marks.service';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { UpdateFloodMarkDto } from './dto/update-flood_mark.dto';

@Controller('flood-marks')
export class FloodMarksController {
  constructor(private readonly floodMarksService: FloodMarksService) {}

  @Post()
  create(@Body() createFloodMarkDto: CreateFloodMarkDto) {
    return this.floodMarksService.create(createFloodMarkDto);
  }

  @Get()
  findAll() {
    return this.floodMarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floodMarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFloodMarkDto: UpdateFloodMarkDto) {
    return this.floodMarksService.update(+id, updateFloodMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floodMarksService.remove(+id);
  }
}
