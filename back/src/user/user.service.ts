import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/User';
import { Address } from '../entities/Address';
import * as bcrypt from 'bcrypt';

@Component()
export class UserService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(data): Promise<User> {
    const user = new User();
    // user.addresses = data.addresses;

    // TODO : send email

    user.birthdate = new Date(data.birthdate);
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = await bcrypt.hash(data.password, 10);
    user.phone = data.phone;
    user.verficationCode =  Math.floor(9000 * Math.random() + 1000).toString();
    try {
        return await this.userRepository.save(user);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findByPhone(phone): Promise<User> {
    return await this.userRepository.findOne({phone});
  }

  async authorize(phone, password): Promise<boolean> {
    let user = await this.findByPhone(phone);
    if (user == null) {
      return false;
    } else {
      let cmp = await bcrypt.compare(password, user.password); 
      if (cmp) {
        return true;
      } else {
        return false;
      }
    }
  }

  async addAddress(city, address, zip, phone, user): Promise<Address> {
    if(await this.addressRepository.count({user, zip}) != 0)
      return null;
    const newAddress = new Address();
    newAddress.address = address;
    newAddress.zip = zip;
    newAddress.city = city;
    newAddress.phone = phone;
    newAddress.user = user;
    try {
      return await this.addressRepository.save(newAddress);
    } catch(e) {
      console.log(e)
      return null;
    }  
  }

  async removeAddress(address): Promise<Address> {
    const adrs = await this.addressRepository.findOne({id: address})
    const removedAddress = await this.addressRepository.remove(adrs)
    return removedAddress
  }
  
  
}