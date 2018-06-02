import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { CartController } from './cart.controller';
import { Cart } from '../entities/Cart';
import { CartDetails } from '../entities/CartDetails';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), TypeOrmModule.forFeature([CartDetails]), TypeOrmModule.forFeature([Product])],
  components: [CartService],
  controllers: [CartController],
})
export class CartModule {}