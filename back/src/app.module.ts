import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import {CorsMiddleware} from "./middlewares/cors.middleware";

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  components: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
//   configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
//     consumer.apply([CorsMiddleware]).forRoutes({path: '*', method: RequestMethod.ALL})
//     }
}
