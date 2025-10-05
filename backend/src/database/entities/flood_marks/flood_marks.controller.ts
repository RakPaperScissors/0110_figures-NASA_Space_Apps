import { Controller, Post, Body, Get, Param, ParseUUIDPipe, Patch, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, UploadedFile } from '@nestjs/common';
import { FloodMarksService } from './flood_marks.service';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { DeviceId } from 'src/common/decorators/device-id.decorator';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Username } from 'src/common/decorators/username.decorator';

@Controller('marks')
export class FloodMarksController {
  constructor(private readonly floodMarksService: FloodMarksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createFloodMarkDto: CreateFloodMarkDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB limit
        ],
      }),
    )
    file: Express.Multer.File,
    @DeviceId() deviceId: string,
    @Username() username?: string,
  ) {
    return this.floodMarksService.create(createFloodMarkDto, file.buffer, deviceId, username);
  }

  @Get('active')
  findActive() {
    return this.floodMarksService.findActive();
  }

  @Patch(':id/refresh')
  refresh(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
      return this.floodMarksService.refresh(id);
  }
}