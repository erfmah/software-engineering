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
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(WishToBuy)
    private readonly wishToBuyRepository: Repository<WishToBuy>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

    try {
        return await this.productRepository.save(product);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findByName(name): Promise<Product> {
    return await this.productRepository.findOne({name});
 }

  async findByCategory(category): Promise<Product[]> {
    return await this.productRepository.find({category});
  }

  async findByManufacturer(manufacturer): Promise<Product[]> {
    return await this.productRepository.find({manufacturer});
  }

  async addToWishList (user , product): Promise<WishToBuy>{
    if(await this.wishToBuyRepository.count({user, product}) != 0)
      return null;
    const wishList = new WishToBuy();
    wishList.product = product;
    wishList.user = user;
    try {
      return await this.wishToBuyRepository.save(wishList);
    } catch(e) {
    console.log(e)
      return null;
    }  
  }

}