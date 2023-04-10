import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCategoryService } from './products-category.service';

describe('ProductsCategoryService', () => {
  let service: ProductsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsCategoryService],
    }).compile();

    service = module.get<ProductsCategoryService>(ProductsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
