import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';
import { ProductController } from './product.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}