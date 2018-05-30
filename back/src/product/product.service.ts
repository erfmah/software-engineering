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

  async createUser(data): Promise<Product> {
    const product = new Product();

    

    try {
        return await this.productRepository.save(product);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

}