import { Controller, Post, Body, Param, ParseUUIDPipe, Get, Res, NotFoundException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { DeviceId } from 'src/common/decorators/device-id.decorator';
import { Username } from 'src/common/decorators/username.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { Express } from 'express';

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
    return this.postsService.create(markId, createPostDto, deviceId, file.buffer, username);
  }

  @Get(':postId/image')
  async getImage(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Res() res: Response,
  ) {
    const post = await this.postsService.findOne(postId);
    
    if (!post || !post.image) {
      throw new NotFoundException('Image not found');
    }

    // Set appropriate headers for image
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust if you support multiple formats
    res.setHeader('Content-Length', post.image.length);
    res.send(post.image);
  }
}