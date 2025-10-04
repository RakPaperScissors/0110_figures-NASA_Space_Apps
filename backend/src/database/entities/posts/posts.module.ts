import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FloodMark } from '../flood_marks/entities/flood_mark.entity';

@Module({
    imports: [
    // The PostsService needs access to both Post and FloodMark repositories.
    TypeOrmModule.forFeature([Post, FloodMark])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
