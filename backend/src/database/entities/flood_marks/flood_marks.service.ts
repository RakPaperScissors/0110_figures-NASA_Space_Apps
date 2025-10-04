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

  async create(dto: CreateFloodMarkDto, imageBuffer: Buffer, deviceId: string, username?: string): Promise<FloodMark> {
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
        notes: dto.notes,
        floodMark: savedMark,
        image: imageBuffer,
        username: username,
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