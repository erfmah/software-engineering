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
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async createManufacturer(data): Promise<Manufacturer> {
    const manufacturer = new Manufacturer();
    manufacturer.name = data.name;
    manufacturer.phone = data.phone;
    manufacturer.site = data.site;

    try {
        return await this.manufacturerRepository.save(manufacturer);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findByName(name): Promise<Manufacturer> {
    return await this.manufacturerRepository.findOne({name});
 }

}