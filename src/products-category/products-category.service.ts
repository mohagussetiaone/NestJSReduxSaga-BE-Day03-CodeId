import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from 'output/entities/ProductCategory';

@Injectable()
export class ProductsCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private serviceRepo: Repository<ProductCategory>,
  ) {}
  public async getProductsCategory() {
    return await this.serviceRepo.find();
  }

  public async getProductsCategoryById(id: number) {
    return await this.serviceRepo.findOne({
      where: { id: id },
    });
  }

  public async addProductsCategory(name: string, description: string) {
    try {
      const productCategory = await this.serviceRepo.save({
        name: name,
        description: description,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return productCategory;
    } catch (error) {
      return error.message;
    }
  }

  public async updateProductsCategory(
    id: number,
    name: string,
    description: string,
  ) {
    try {
      const productCategory = await this.serviceRepo.update(id, {
        name: name,
        description: description,
        updatedat: new Date(),
      });
      return productCategory;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteProductsCategory(id: number) {
    try {
      const productCategory = await this.serviceRepo.delete(id);
      return productCategory;
    } catch (error) {
      return error.message;
    }
  }
}
