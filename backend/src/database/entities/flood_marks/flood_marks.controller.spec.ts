import { Test, TestingModule } from '@nestjs/testing';
import { FloodMarksController } from './flood_marks.controller';
import { FloodMarksService } from './flood_marks.service';
import { CreateFloodMarkDto } from './dto/create-flood_mark.dto';
import { SeverityLevel } from 'src/database/enums/severity-level.enum';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';

// We create a mock version of the FloodMarksService.
// This object mimics the real service, and we can control what its methods return.
const mockFloodMarksService = {
  create: jest.fn(),
  findActive: jest.fn(),
  addPost: jest.fn(),
  refresh: jest.fn(),
};

describe('FloodMarksController', () => {
  let controller: FloodMarksController;
  let service: FloodMarksService;

  beforeEach(async () => {
    // Set up a testing module that provides our controller and the mock service.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloodMarksController],
      providers: [
        {
          provide: FloodMarksService,
          useValue: mockFloodMarksService,
        },
      ],
    }).compile();

    controller = module.get<FloodMarksController>(FloodMarksController);
    service = module.get<FloodMarksService>(FloodMarksService);
  });
  
  // A simple sanity check to ensure the controller is created successfully.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service to create a new flood mark', async () => {
      const dto: CreateFloodMarkDto = {
        latitude: 40.7128,
        longitude: -74.006,
        imageUrl: 'http://example.com/image.jpg',
        severity: SeverityLevel.HIGH,
        notes: 'Water is high',
      };
      const deviceId = 'test-device-123';
      const mockResult = { id: uuidv4(), ...dto, posts: [] };

      // Tell our mock service to return a specific value when 'create' is called.
      mockFloodMarksService.create.mockResolvedValue(mockResult);

      const result = await controller.create(dto, deviceId);
      
      // Assert that the service's create method was called with the correct arguments.
      expect(service.create).toHaveBeenCalledWith(dto, deviceId);
      // Assert that the controller returned the value from the service.
      expect(result).toEqual(mockResult);
    });
  });
  
  describe('findActive', () => {
    it('should call the service to find all active flood marks', async () => {
      const mockResult = [{ id: uuidv4(), severity: SeverityLevel.LOW, posts: [] }];
      mockFloodMarksService.findActive.mockResolvedValue(mockResult);

      const result = await controller.findActive();

      expect(service.findActive).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });
  
  describe('refresh', () => {
    it('should call the service to refresh a flood mark', async () => {
      const markId = uuidv4();
      const mockResult = { id: markId, updatedAt: new Date() };

      mockFloodMarksService.refresh.mockResolvedValue(mockResult);

      const result = await controller.refresh(markId);

      expect(service.refresh).toHaveBeenCalledWith(markId);
      expect(result).toEqual(mockResult);
    });
  });
});