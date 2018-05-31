import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
<<<<<<< HEAD
import { Product } from '../entities/Product';
import { Manufacturer } from '../entities/Manufacturer';
import * as bcrypt from 'bcrypt';
import { Category } from 'entities/Category';
import { WishToBuy } from 'entities/wishtobuy';
import { User } from 'entities/User';
=======
import { Category } from '../entities/Category';
import * as bcrypt from 'bcrypt';
>>>>>>> 9cac6a5eb6cb4f827794c737ba08ab95b2a18f63

@Component()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data): Promise<Category> {
    const category = new Category();
    category.name = data.name;
<<<<<<< HEAD

    try {
        return await this.categoryRepository.save(category);
    } catch(e) {
      console.log(e)
=======
    try {
        return await this.categoryRepository.save(category);
    } catch(e) {
        console.log(e)
>>>>>>> 9cac6a5eb6cb4f827794c737ba08ab95b2a18f63
        return null;
    }
  }

<<<<<<< HEAD
  async findByName(name): Promise<Category> {
    return await this.categoryRepository.findOne({name});
 }
=======
  async all(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
>>>>>>> 9cac6a5eb6cb4f827794c737ba08ab95b2a18f63

}