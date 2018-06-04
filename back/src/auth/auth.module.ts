import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthController } from './auth.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'entities/Address';
import { Order } from 'entities/Order';

@Module({
  imports: [  TypeOrmModule.forFeature([User, Address]) ],
  components: [UserService, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate(LocalStrategy))
      .forRoutes({ path: '/product/wish', method: RequestMethod.ALL },
      { path: '/user/addAddress', method: RequestMethod.ALL },
      { path: '/order/create', method: RequestMethod.ALL },
      { path: '/cart/add', method: RequestMethod.ALL });
  }
}