import { Controller, Post, Body, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { FloodMarksService } from './flood_marks.service';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { DeviceId } from 'src/common/decorators/device-id.decorator';
import { CreatePostDto } from '../posts/dto/create-post.dto';

@Controller('marks')
export class FloodMarksController {
  constructor(private readonly floodMarksService: FloodMarksService) {}

  @Post()
  create(
    @Body() createFloodMarkDto: CreateFloodMarkDto,
    @DeviceId() deviceId: string,
  ) {
    return this.floodMarksService.create(createFloodMarkDto, deviceId);
  }

  @Get('active')
  findActive() {
    return this.floodMarksService.findActive();
  }

  @Post(':id/posts')
  addPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPostDto: CreatePostDto,
    @DeviceId() deviceId: string,
  ) {
    return this.floodMarksService.addPost(id, createPostDto, deviceId);
  }
  
  @Patch(':id/refresh')
  refresh(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
      return this.floodMarksService.refresh(id);
  }
}