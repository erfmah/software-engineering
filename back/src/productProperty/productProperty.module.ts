import { Module } from '@nestjs/common';
import { ProductPropertyService } from './productProperty.service';
import { ProductPropertyController } from './productProperty.controller';
import { Manufacturer } from '../entities/Manufacturer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProperty } from 'entities/ProductProperty';
import { Product } from 'entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductProperty,Product])],
  components: [ProductPropertyService],
  controllers: [ProductPropertyController],
})
export class ProductPropertyModule {}