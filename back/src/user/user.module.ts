import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/Address';
import { Order } from '../entities/Order';
import { CartDetails } from '../entities/CartDetails';
import { Cart } from '../entities/Cart';
import { OrderDetails } from '../entities/OrderDetails';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Order, Cart, OrderDetails, CartDetails])],
  components: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}