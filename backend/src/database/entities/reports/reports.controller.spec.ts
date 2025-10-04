import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportReason } from 'src/database/enums/report-reason.enum';
import { v4 as uuidv4 } from 'uuid';

// Mock version of the ReportsService
const mockReportsService = {
  create: jest.fn(),
};

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service to create a new report for a post', async () => {
      const postId = uuidv4();
      const deviceId = 'test-device-789';
      const dto: CreateReportDto = {
        reason: ReportReason.SPAM,
      };
      const mockResult = { id: uuidv4(), ...dto, postId, deviceId };

      // Configure the mock service's return value for this test
      mockReportsService.create.mockResolvedValue(mockResult);
      
      const result = await controller.create(postId, dto, deviceId);

      // Verify the controller called the service with the correct data
      expect(service.create).toHaveBeenCalledWith(postId, dto, deviceId);
      // Verify the controller returned the expected result
      expect(result).toEqual(mockResult);
    });
  });
});