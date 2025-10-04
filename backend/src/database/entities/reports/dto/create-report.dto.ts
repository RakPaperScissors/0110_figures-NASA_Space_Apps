import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReportReason } from 'src/database/enums/report-reason.enum';

export class CreateReportDto {
  @IsEnum(ReportReason)
  @IsNotEmpty()
  reason: ReportReason;
}