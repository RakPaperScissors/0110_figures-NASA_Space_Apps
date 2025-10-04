import { Test, TestingModule } from '@nestjs/testing';
import { FloodMarksService } from './flood_marks.service';

describe('FloodMarksService', () => {
  let service: FloodMarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloodMarksService],
    }).compile();

    service = module.get<FloodMarksService>(FloodMarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
