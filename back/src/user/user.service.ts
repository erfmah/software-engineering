import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}