import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { DeviceId } from 'src/common/decorators/device-id.decorator';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/marks/:markId')
  create(
    @Param('markId', ParseUUIDPipe) markId: string,
    @Body() createPostDto: CreatePostDto,
    @DeviceId() deviceId: string,
  ) {
    return this.postsService.create(markId, createPostDto, deviceId);
  }
}