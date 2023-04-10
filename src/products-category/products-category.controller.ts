import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsCategoryService } from './products-category.service';

@Controller('productscategory')
export class ProductsCategoryController {
  constructor(private Services: ProductsCategoryService) {}
  @Get()
  public async getAll() {
    return await this.Services.getProductsCategory();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getProductsCategoryById(id);
  }
  @Post()
  public async Create(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.Services.addProductsCategory(name, description);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.Services.updateProductsCategory(id, name, description);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteProductsCategory(id);
  }
}
