import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { Manufacturer } from '../entities/Manufacturer';
import * as bcrypt from 'bcrypt';
import { Category } from 'entities/Category';
import { WishToBuy } from 'entities/wishtobuy';
import { User } from 'entities/User';

@Component()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data): Promise<Category> {
    const category = new Category();
    category.name = data.name;

    try {
        return await this.categoryRepository.save(category);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findByName(name): Promise<Category> {
    return await this.categoryRepository.findOne({name});
 }

}