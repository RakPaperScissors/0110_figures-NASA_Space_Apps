import { Injectable } from '@nestjs/common';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { UpdateFloodMarkDto } from './dto/update-flood_mark.dto';

@Injectable()
export class FloodMarksService {
  create(createFloodMarkDto: CreateFloodMarkDto) {
    return 'This action adds a new floodMark';
  }

  findAll() {
    return `This action returns all floodMarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floodMark`;
  }

  update(id: number, updateFloodMarkDto: UpdateFloodMarkDto) {
    return `This action updates a #${id} floodMark`;
  }

  remove(id: number) {
    return `This action removes a #${id} floodMark`;
  }
}
