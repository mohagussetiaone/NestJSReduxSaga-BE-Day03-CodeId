import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { ProductCategory } from 'output/entities/ProductCategory';

@Controller('products')
export class ProductsController {
  constructor(private Services: ProductsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getProducts();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getProductsById(id);
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @UploadedFile() file,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('category') category: ProductCategory,
    @Body('price') price: string,
  ) {
    return await this.Services.Upload(file, name, description, category, price);
  }
  @Post()
  public async Create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('category') category: ProductCategory,
    @Body('price') price: string,
    @Body('image') image: string,
  ) {
    return await this.Services.addProducts(
      name,
      description,
      category,
      price,
      image,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('category') category: ProductCategory,
    @Body('price') price: string,
    @Body('image') image: string,
  ) {
    return await this.Services.updateProducts(
      id,
      name,
      description,
      category,
      price,
      image,
    );
  }
  @Put('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadUpdate(
    @Param('id') id: number,
    @UploadedFile() file,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('category') category: ProductCategory,
    @Body('price') price: string,
  ) {
    return await this.Services.UploadUpdate(
      id,
      file,
      name,
      description,
      category,
      price,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteProducts(id);
  }
}
