import { CustomerController } from './../customer/customer.controller';
import { CustomerService } from './../customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'output/entities/Users';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Customer } from 'output/entities/Customer';
import { Orders } from 'output/entities/Orders';
import { OrderDetail } from 'output/entities/OrderDetail';
import { ProductCategory } from 'output/entities/ProductCategory';
import { Product } from 'output/entities/Product';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      ProductCategory,
      Customer,
      Orders,
      Product,
      OrderDetail,
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [LocalGuard, JwtGuard, UserService, CustomerService],
  controllers: [UserController, CustomerController],
  exports: [UserService],
})
export class ModuleModule {}
