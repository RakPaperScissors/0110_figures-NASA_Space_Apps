import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { SeverityLevel } from 'src/database/enums/severity-level.enum';

export class CreateFloodMarkDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsEnum(SeverityLevel)
  severity: SeverityLevel;
  
  @IsOptional()
  @IsString()
  notes?: string;
}