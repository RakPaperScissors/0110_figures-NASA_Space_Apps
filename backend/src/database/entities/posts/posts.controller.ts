import { Controller, Post, Body, Param, ParseUUIDPipe, Get, Res, NotFoundException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { PostsService } from './posts.service';
import { DeviceId } from 'src/common/decorators/device-id.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Username } from 'src/common/decorators/username.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/marks/:markId')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('markId', ParseUUIDPipe) markId: string,
    @Body() createPostDto: CreatePostDto,
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
    return this.postsService.create(markId, createPostDto, file.buffer, deviceId, username);
  }

  @Get(':id/image')
  async getImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const post = await this.postsService.findOne(id);
    
    if (!post || !post.image) {
      throw new NotFoundException('Image not found');
    }

    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000');
    res.send(post.image);
  }
}