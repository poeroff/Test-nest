import { Test, TestingModule } from '@nestjs/testing';
import { OpentimeController } from './opentime.controller';
import { OpentimeService } from './opentime.service';

describe('OpentimeController', () => {
  let controller: OpentimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpentimeController],
      providers: [OpentimeService],
    }).compile();

    controller = module.get<OpentimeController>(OpentimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
