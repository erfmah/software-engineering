import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/Address';
import { Order } from '../entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Address, User])],
  components: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}