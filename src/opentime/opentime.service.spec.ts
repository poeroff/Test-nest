import { Test, TestingModule } from '@nestjs/testing';
import { OpentimeService } from './opentime.service';

describe('OpentimeService', () => {
  let service: OpentimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpentimeService],
    }).compile();

    service = module.get<OpentimeService>(OpentimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
