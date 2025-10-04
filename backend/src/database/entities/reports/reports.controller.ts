import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { DeviceId } from 'src/common/decorators/device-id.decorator';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
    
    @Post('/posts/:postId')
    create(
        @Param('postId', ParseUUIDPipe) postId: string,
        @Body() createReportDto: CreateReportDto,
        @DeviceId() deviceId: string,
    ) {
        return this.reportsService.create(postId, createReportDto, deviceId);
    }
}