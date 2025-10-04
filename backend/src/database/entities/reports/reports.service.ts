import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { FloodMark } from '../flood_marks/entities/flood_mark.entity';

const FAKE_REPORT_THRESHOLD = 5;
const TRUST_SCORE_PENALTY = 25;
const DELETION_TRUST_THRESHOLD = 50;


@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
        private readonly dataSource: DataSource,
    ) {}
    
    async create(postId: string, dto: CreateReportDto, deviceId: string) {
        // Use a transaction to ensure data integrity
        return this.dataSource.transaction(async manager => {
            const post = await manager.findOne(Post, {
                where: { id: postId },
                relations: ['floodMark'], // Load the parent floodMark
            });
            
            if (!post) {
                throw new NotFoundException(`Post with ID ${postId} not found`);
            }
            
            // Check if this device has already reported this post
            const existingReport = await manager.findOneBy(Report, { postId, deviceId });
            if(existingReport) {
                throw new ConflictException('You have already reported this post.');
            }

            // Create and save the new report
            const report = manager.create(Report, { ...dto, deviceId, postId });
            await manager.save(report);

            // Increment the fake report count on the post
            post.fakeReportCount = (post.fakeReportCount || 0) + 1;
            
            // Check if the report count exceeds the threshold
            if (post.fakeReportCount >= FAKE_REPORT_THRESHOLD) {
                const floodMark = post.floodMark;
                floodMark.trustScore -= TRUST_SCORE_PENALTY;

                // If trust score is too low, delete the whole mark
                if (floodMark.trustScore < DELETION_TRUST_THRESHOLD) {
                    await manager.remove(floodMark); // This will cascade delete posts and reports
                    return { message: `Flood mark ${floodMark.id} deleted due to low trust score.` };
                } else {
                    await manager.save(floodMark);
                }
            }
            
            await manager.save(post);
            return report;
        });
    }
}