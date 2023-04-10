import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { Orders } from 'output/entities/Orders';
import { Product } from 'output/entities/Product';

@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private Services: OrderDetailsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getOrderDetails();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getOrderDetailsById(id);
  }
  @Post()
  public async Create(
    @Body('order') order: Orders,
    @Body('product') product: Product,
    @Body('quantity') quantity: number,
  ) {
    return await this.Services.addOrderDetails(order, product, quantity);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('order') order: Orders,
    @Body('product') product: Product,
    @Body('quantity') quantity: number,
  ) {
    return await this.Services.updateOrderDetails(id, order, product, quantity);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteOrderDetails(id);
  }
}
