import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/Image';
import * as bcrypt from 'bcrypt';

@Component()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}  

  async create(alt, path): Promise<Image> {
    const image = new Image();
    image.alt = alt
    image.path = path
    try {
        return await this.imageRepository.save(image);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

 // async addImage(name): Promise<Image> {
 //   return await this.imageRepository.findOne({nme});
 //}


}