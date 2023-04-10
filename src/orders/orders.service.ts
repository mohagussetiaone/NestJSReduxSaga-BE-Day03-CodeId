import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'output/entities/Orders';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private serviceRepo: Repository<Orders>,
  ) {}
  public async getOrders() {
    return await this.serviceRepo.find({
      relations: {
        user: true,
      },
    });
  }

  public async getOrdersById(id: number) {
    return await this.serviceRepo.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }

  public async addOrders(
    user: Users,
    totalproduct: number,
    totalprice: string,
  ) {
    try {
      const order = await this.serviceRepo.save({
        user: user,
        totalproduct: totalproduct,
        totalprice: totalprice,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return order;
    } catch (error) {
      return error.message;
    }
  }

  public async updateOrders(
    id: number,
    user: Users,
    totalproduct: number,
    totalprice: string,
  ) {
    try {
      const order = await this.serviceRepo.update(id, {
        user: user,
        totalproduct: totalproduct,
        totalprice: totalprice,
        updatedat: new Date(),
      });
      return order;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteOrders(id: number) {
    try {
      const order = await this.serviceRepo.delete(id);
      return order;
    } catch (error) {
      return error.message;
    }
  }
}
