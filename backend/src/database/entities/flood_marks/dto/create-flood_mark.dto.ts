import { IsEnum, IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';
import { SeverityLevel } from 'src/database/enums/severity-level.enum';

export class CreateFloodMarkDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsEnum(SeverityLevel)
  severity: SeverityLevel;
  
  @IsOptional()
  @IsString()
  notes?: string;
}