import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { CartController } from './cart.controller';
import { Cart } from '../entities/Cart';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  components: [CartService],
  controllers: [CartController],
})
export class CartModule {}