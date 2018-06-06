import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/Image';
import * as bcrypt from 'bcrypt';
import { writeFile, writeFileSync, existsSync, mkdirSync } from 'fs';
import { Product } from 'entities/Product';
import { dirname } from 'path';

@Component()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}  
  
  async createMany(product: Product, files, alt): Promise<Image[]> {
    let toDo = []
    for(let f of files) {
      toDo.push(this.create(product, f, alt))
    }
    return await Promise.all(toDo)
  }
  async create(product: Product, file, alt): Promise<Image> {
    const image = new Image();
    image.alt = alt
    image.path = await this.saveFile(file, product.category)
    image.product = product
    try {
        return await this.imageRepository.save(image);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async saveFile(file, cat): Promise<string> {
    let path = "src/public/upload/" + cat + "/" + file.originalname
    let pathToRet = "/upload/" + cat + "/" + file.originalname
    if (this.ensureDirectoryExistence(path))
      writeFileSync(path, file.buffer);
    return pathToRet;
  }

  ensureDirectoryExistence(filePath) {
    var dir = dirname(filePath);
    if (existsSync(dir)) {
      return true;
    }
    this.ensureDirectoryExistence(dir);
    mkdirSync(dir);
  }

 // async addImage(name): Promise<Image> {
 //   return await this.imageRepository.findOne({nme});
 //}


}