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

  async create(markId: string, dto: CreatePostDto, deviceId: string): Promise<Post> {
    return this.dataSource.transaction(async (manager) => {
      const floodMark = await manager.findOneBy(FloodMark, { id: markId });

      if (!floodMark) {
        throw new NotFoundException(`FloodMark with ID ${markId} not found`);
      }
      floodMark.updatedAt = new Date();
      await manager.save(floodMark);

      const newPost = manager.create(Post, {
        ...dto,
        deviceId,
        floodMark,
      });

      return manager.save(newPost);
    });
  }
}