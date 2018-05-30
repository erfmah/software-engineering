import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import * as bcrypt from 'bcrypt';

@Component()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(data): Promise<Product> {
    const product = new Product();
    product.name = data.name;
    product.price = data.price;
    product.weight = data.weight;
    product.category = data.category;
    product.manufacturer = data.manufacturer;
    product.longDesc = data.longDesc;
    product.productStock = data.productStock;
    product.live = data.live;
   // product.sku = 

    try {
        return await this.productRepository.save(product);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findByName(name): Promise<Product> {
    return await this.productRepository.findOne({name: name});
    //return await this.userRepository.findOne({phone: phone});
  }

  async authorize(name): Promise<boolean> {
    let product = await this.findByName(name);
    if (product == null) {
      return false;
    } else {
      return true;
    }
  }
}