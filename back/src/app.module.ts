import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ManufacturerModule} from './manufacturer/manufacturer.module'
import { CartModule } from 'cart/cart.module';
import { OrderModule } from 'order/order.module';
@Module({
  imports: [UserModule, AuthModule, ProductModule, CategoryModule, ManufacturerModule,OrderModule, CartModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  components: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
//   configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
//     consumer.apply([CorsMiddleware]).forRoutes({path: '*', method: RequestMethod.ALL})
//     }
}
