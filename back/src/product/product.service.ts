import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { Manufacturer } from '../entities/Manufacturer';
import * as bcrypt from 'bcrypt';
import { Category } from 'entities/Category';
import { WishToBuy } from 'entities/wishtobuy';
import { User } from 'entities/User';
import { ProductProperty } from 'entities/ProductProperty';
import { ImageService } from 'image/image.service';

@Component()
export class ProductService {
  constructor(
    private readonly imageService: ImageService,
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
    await this.productRepository.save(product);
    product.images = await this.imageService.createMany(product, data.images, data.imagesAlt)

    try {
        return await this.productRepository.save(product);
    } catch(e) {
      console.log(e)
        return null;
    }
  }
  async getLast(num): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['images'],
      order: {
         id: 'DESC'
      },
      take: num
    })
 }
 async getLastOfCat(num, cat): Promise<Product[]> {
  return await this.productRepository.createQueryBuilder("product")
                                      .where("product.category = :cat ", {cat})
                                      .orderBy("product.id", "DESC")
                                      .limit(num)
                                      .leftJoinAndSelect("product.images", "Image")
                                      .getMany()
}
  async findByName(name): Promise<Product> {
    return await this.productRepository.findOne({name});
 }

 async findById(id): Promise<Product> {
  return (await this.productRepository.find({where:{id}, relations:['images', 'properties', 'category']}))[0];
}

  async findByCategory(category): Promise<Product[]> {
    return await this.productRepository.find({where:{category}, relations:['images']});
  }

  async findByManufacturer(manufacturer): Promise<Product[]> {
    return await this.productRepository.find({manufacturer});
  }

  async addToWishList(user , product): Promise<WishToBuy> {
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

  async getWishList(user): Promise<WishToBuy[]> {
    return await this.wishToBuyRepository.find({where:{user}, relations:["product", "product.images"]})
  }

  async removeFromWishList(wish): Promise<WishToBuy> {
    const wishList = await this.wishToBuyRepository.findOne({id: wish})
    const removedWish = await this.wishToBuyRepository.remove(wishList)
    return removedWish 
  }

  async searchByName(name): Promise<Product[]> {
    return await this.productRepository.createQueryBuilder("product")
                                       .where("product.name like :name", {name: '%' + name + '%' })
                                       .leftJoinAndSelect("product.images", "Image")
                                       .getMany();
  }

  async getProperties(product): Promise<ProductProperty[]> {
      const newproduct =  await this.productRepository.createQueryBuilder("product")
                                             .where("product.id = :id", {id: product})
                                             .leftJoinAndSelect("product.properties", "ProductProperty")
                                             .getOne()
      return newproduct.properties;
  }
  

}