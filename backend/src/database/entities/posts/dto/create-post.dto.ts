import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { SeverityLevel } from 'src/database/enums/severity-level.enum';

export class CreatePostDto {
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