import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import * as bcrypt from 'bcrypt';

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

  async all(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

}