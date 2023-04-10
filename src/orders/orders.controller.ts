import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Users } from 'output/entities/Users';

@Controller('orders')
export class OrdersController {
  constructor(private Services: OrdersService) {}
  @Get()
  public async getAll() {
    return await this.Services.getOrders();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getOrdersById(id);
  }
  @Post()
  public async Create(
    @Body('user') user: Users,
    @Body('totalproduct') totalproduct: number,
    @Body('totalprice') totalprice: string,
  ) {
    return await this.Services.addOrders(user, totalproduct, totalprice);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('user') user: Users,
    @Body('totalproduct') totalproduct: number,
    @Body('totalprice') totalprice: string,
  ) {
    return await this.Services.updateOrders(id, user, totalproduct, totalprice);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteOrders(id);
  }
}
