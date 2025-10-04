import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FloodMark } from '../flood_marks/entities/flood_mark.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(FloodMark)
    private readonly floodMarkRepository: Repository<FloodMark>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    markId: string, 
    createPostDto: CreatePostDto, 
    deviceId: string,
    imageBuffer?: Buffer,
    username?: string,
  ): Promise<Post> {
    return this.dataSource.transaction(async (manager) => {
      const floodMark = await manager.findOneBy(FloodMark, { id: markId });

      if (!floodMark) {
        throw new NotFoundException(`FloodMark with ID ${markId} not found`);
      }
      floodMark.updatedAt = new Date();
      await manager.save(floodMark);

      const newPost = manager.create(Post, {
        ...createPostDto,
        deviceId,
        floodMark,
        image: imageBuffer,
        username,
      });

      return manager.save(newPost);
    });
  }

  async findOne(postId: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return post;
  }
}