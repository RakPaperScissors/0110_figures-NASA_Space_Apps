import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';

const mockPostsService = {
  create: jest.fn(),
};

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    // Set up the NestJS testing module.
    // We provide our real controller but swap the real service for our mock version.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  // Reset mocks before each test to ensure tests are isolated.
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service to create a post under a specific flood mark', async () => {
      // 1. Arrange: Set up our test data and mock return values.
      const markId = uuidv4();
      const deviceId = 'test-device-post-123';
      const dto: CreatePostDto = {
        imageUrl: 'http://example.com/a-new-post.jpg',
        notes: 'The water is receding slightly.',
      };

      // This is the object we expect our mock service to return.
      const mockResult = {
        id: uuidv4(),
        ...dto,
        deviceId,
        floodMarkId: markId,
        createdAt: new Date(),
      };

      // Tell the mock service what to do when its 'create' method is called.
      mockPostsService.create.mockResolvedValue(mockResult);

      // 2. Act: Call the controller method we want to test.
      const result = await controller.create(markId, dto, deviceId);

      // 3. Assert: Verify the outcome.
      // Was the service's create method called?
      expect(service.create).toHaveBeenCalled();
      
      // Was it called with the correct arguments from the route params, body, and decorator?
      expect(service.create).toHaveBeenCalledWith(markId, dto, deviceId);
      
      // Did the controller return the value that the service provided?
      expect(result).toEqual(mockResult);
    });
  });
});