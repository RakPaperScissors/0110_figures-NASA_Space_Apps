import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FloodMark } from './entities/flood_mark.entity';
import { Post } from '../posts/entities/post.entity';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { Point } from 'geojson';
import { MarkStatus } from 'src/database/enums/mark-status.enum';

@Injectable()
export class FloodMarksService {
  constructor(
    @InjectRepository(FloodMark)
    private readonly floodMarksRepository: Repository<FloodMark>,
    private readonly dataSource: DataSource, // For transactions
  ) {}

  async create(dto: CreateFloodMarkDto, deviceId: string): Promise<FloodMark> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // GeoJSON Point format for PostGIS
      const location: Point = {
        type: 'Point',
        coordinates: [dto.longitude, dto.latitude],
      };

      const floodMark = queryRunner.manager.create(FloodMark, {
        location,
        severity: dto.severity,
      });

      const savedMark = await queryRunner.manager.save(floodMark);

      const post = queryRunner.manager.create(Post, {
        deviceId,
        imageUrl: dto.imageUrl,
        notes: dto.notes,
        floodMark: savedMark,
      });

      await queryRunner.manager.save(post);
      await queryRunner.commitTransaction();

      const result = await this.floodMarksRepository.findOne({
          where: { id: savedMark.id },
          relations: ['posts']
      });
      if (!result) {
        throw new NotFoundException(`FloodMark with ID ${savedMark.id} not found`);
      }
      return result;

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async addPost(markId: string, dto: CreatePostDto, deviceId: string): Promise<Post> {
    const floodMark = await this.floodMarksRepository.findOneBy({ id: markId });
    if (!floodMark) {
      throw new NotFoundException(`FloodMark with ID ${markId} not found`);
    }

    // Refresh the mark's updatedAt timestamp
    floodMark.updatedAt = new Date();
    
    const post = this.dataSource.manager.create(Post, {
      ...dto,
      deviceId,
      floodMark,
    });
    
    // Save both the updated mark and the new post in a transaction
    await this.dataSource.transaction(async manager => {
        await manager.save(post);
        await manager.save(floodMark);
    });
    
    return post;
  }
  
  async refresh(id: string): Promise<FloodMark> {
    const mark = await this.floodMarksRepository.findOneBy({ id });
    if (!mark) {
        throw new NotFoundException(`FloodMark with ID ${id} not found`);
    }
    
    // The core of the refresh logic: just update the timestamp
    mark.updatedAt = new Date();
    return this.floodMarksRepository.save(mark);
  }

  findActive(): Promise<FloodMark[]> {
    return this.floodMarksRepository.find({
      where: { status: MarkStatus.ACTIVE },
      relations: ['posts'],
      order: {
        updatedAt: 'DESC'
      }
    });
  }
}