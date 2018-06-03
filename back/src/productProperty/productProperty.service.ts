import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import * as bcrypt from 'bcrypt';
import { User } from 'entities/User';
import { ProductProperty } from 'entities/ProductProperty';

@Component()
export class ProductPropertyService {
  constructor(
    @InjectRepository(ProductProperty)
    private readonly productPropertyRepository: Repository<ProductProperty>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProductProperty(key, value, type): Promise<ProductProperty> {
    key = key.toLowerCase()
    value = value.toLowerCase()
    let productProperty = await this.findByKeyAndValue(key , value);

    if(productProperty)
        return productProperty;
    else {
        productProperty = new ProductProperty();
        productProperty.key = key;
        productProperty.value = value;
        productProperty.type = type;
        console.log(productProperty)
    }
    
    try {
        return await this.productPropertyRepository.save(productProperty);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findProduct(product): Promise<Product> {
      return await this.productRepository.createQueryBuilder("product")
                                             .where("product.id = :id", {id: product})
                                             .leftJoinAndSelect("product.properties", "ProductProperty")
                                             .getOne()
  }
  async addPropertyToProduct(key, value, type, product): Promise<Product> {
    const productProperty = await this.createProductProperty(key, value, type)
    const newProduct = await this.findProduct(product)
    newProduct.properties.push(productProperty)
    return await this.productRepository.save(newProduct)
  }

  async findByKeyAndValue(key, value): Promise<ProductProperty> {
    return await this.productPropertyRepository.findOne({key, value});
 }

  async searchByProperties(key, value): Promise<Product[]> {
    const productProperty =  await this.productPropertyRepository.createQueryBuilder("productProperty")
                                       .where("productProperty.key = :key", {key})
                                       .andWhere("productProperty.value = :value", {value})
                                       .leftJoinAndSelect("productProperty.products", "Product")
                                       .getOne()
    return productProperty.products
 }
}