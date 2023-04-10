import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';
import { Repository } from 'typeorm';
import { ProductCategory } from 'output/entities/ProductCategory';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private serviceRepo: Repository<Product>,
  ) {}
  public async getProducts() {
    return await this.serviceRepo.find({
      relations: {
        category: true,
      },
    });
  }

  public async getProductsById(id: number) {
    return await this.serviceRepo.findOne({
      where: { id: id },
      relations: {
        category: true,
      },
    });
  }

  public async addProducts(
    name: string,
    description: string,
    category: ProductCategory,
    price: string,
    image: string,
  ) {
    try {
      const product = await this.serviceRepo.save({
        name: name,
        description: description,
        category: category,
        price: price,
        image: image,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return product;
    } catch (error) {
      return error.message;
    }
  }

  public async Upload(
    file,
    name: string,
    description: string,
    category: ProductCategory,
    price: string,
  ) {
    try {
      const product = await this.serviceRepo.save({
        name: name,
        description: description,
        category: category,
        price: price,
        image: file.originalname,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return product;
    } catch (error) {
      return error.message;
    }
  }

  public async UploadUpdate(
    id: number,
    file,
    name: string,
    description: string,
    category: ProductCategory,
    price: string,
  ) {
    try {
      const product = await this.serviceRepo.update(id, {
        name: name,
        description: description,
        category: category,
        price: price,
        image: file.originalname,
        updatedat: new Date(),
      });
      return product;
    } catch (error) {
      return error.message;
    }
  }

  public async updateProducts(
    id: number,
    name: string,
    description: string,
    category: ProductCategory,
    price: string,
    image: string,
  ) {
    try {
      const product = await this.serviceRepo.update(id, {
        name: name,
        description: description,
        category: category,
        price: price,
        image: image,
        updatedat: new Date(),
      });
      return product;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteProducts(id: number) {
    try {
      const product = await this.serviceRepo.delete(id);
      return product;
    } catch (error) {
      return error.message;
    }
  }
}
