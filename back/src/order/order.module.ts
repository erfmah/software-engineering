import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service';
import { OrderController } from './order.controller';
import { Product } from '../entities/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'entities/Cart';
import { Order } from 'entities/Order';
import { OrderDetails } from 'entities/OrderDetails';
import { CartDetails } from 'entities/CartDetails';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart, OrderDetails, CartDetails])],
  components: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}