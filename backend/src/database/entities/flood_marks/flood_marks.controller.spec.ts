import { Test, TestingModule } from '@nestjs/testing';
import { FloodMarksController } from './flood_marks.controller';
import { FloodMarksService } from './flood_marks.service';

describe('FloodMarksController', () => {
  let controller: FloodMarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloodMarksController],
      providers: [FloodMarksService],
    }).compile();

    controller = module.get<FloodMarksController>(FloodMarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
