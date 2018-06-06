import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service';
import { OrderController } from './order.controller';
import { Product } from '../entities/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'entities/Cart';
import { Order } from 'entities/Order';
import { User } from 'entities/User';
import { OrderDetails } from 'entities/OrderDetails';
import { CartDetails } from 'entities/CartDetails';
import { UserService } from 'user/user.service';
import { Address } from 'entities/Address';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Order, Cart, OrderDetails, CartDetails])],
  components: [OrderService, UserService],
  controllers: [OrderController],
})
export class OrderModule {}