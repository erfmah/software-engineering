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
import { AuthController } from './auth.controller';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'entities/Address';


@Module({
  imports: [  TypeOrmModule.forFeature([User, Address]) ],
  components: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/product/wish', method: RequestMethod.ALL },
      { path: '/user/addAddress', method: RequestMethod.ALL },
      { path: '/cart/add', method: RequestMethod.ALL });
  }
}