import { PartialType } from '@nestjs/mapped-types';
import { CreateFloodMarkDto } from './create-flood_mark.dto';

export class UpdateFloodMarkDto extends PartialType(CreateFloodMarkDto) {}
