import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UserModule, AuthModule, ProductModule, CategoryModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  components: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
//   configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
//     consumer.apply([CorsMiddleware]).forRoutes({path: '*', method: RequestMethod.ALL})
//     }
}
