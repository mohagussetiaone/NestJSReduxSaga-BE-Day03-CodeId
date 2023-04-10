import { Orders } from 'output/entities/Orders';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'output/entities/OrderDetail';
import { Repository } from 'typeorm';
import { Product } from 'output/entities/Product';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private serviceRepo: Repository<OrderDetail>,
  ) {}
  public async getOrderDetails() {
    return await this.serviceRepo.find({
      relations: {
        product: true,
        order: true,
      },
    });
  }

  public async getOrderDetailsById(id: number) {
    return await this.serviceRepo.findOne({
      where: { id: id },
      relations: {
        product: true,
        order: true,
      },
    });
  }

  public async addOrderDetails(
    order: Orders,
    product: Product,
    quantity: number,
  ) {
    try {
      const orderDetail = await this.serviceRepo.save({
        order: order,
        product: product,
        quantity: quantity,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return orderDetail;
    } catch (error) {
      return error.message;
    }
  }

  public async updateOrderDetails(
    id: number,
    order: Orders,
    product: Product,
    quantity: number,
  ) {
    try {
      const orderDetail = await this.serviceRepo.update(id, {
        order: order,
        product: product,
        quantity: quantity,
        updatedat: new Date(),
      });
      return orderDetail;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteOrderDetails(id: number) {
    try {
      const orderDetail = await this.serviceRepo.delete(id);
      return orderDetail;
    } catch (error) {
      return error.message;
    }
  }
}
