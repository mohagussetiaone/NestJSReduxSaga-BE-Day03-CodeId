import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCategoryController } from './products-category.controller';

describe('ProductsCategoryController', () => {
  let controller: ProductsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCategoryController],
    }).compile();

    controller = module.get<ProductsCategoryController>(ProductsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
