import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { FloodMark } from '../flood_marks/entities/flood_mark.entity';

const FAKE_REPORT_THRESHOLD = 3;
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
                relations: ['FloodMark'], // Load the parent floodMark
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
            
            // Check if the report count exceeds the threshold (3 reports)
            if (post.fakeReportCount >= FAKE_REPORT_THRESHOLD) {
                // Flag the post as reported - it will be hidden from frontend
                return { 
                    ...report, 
                    message: `Post has been flagged after ${FAKE_REPORT_THRESHOLD} reports and will be hidden.`,
                    postFlagged: true
                };
            }
            
            await manager.save(post);
            return report;
        });
    }
}