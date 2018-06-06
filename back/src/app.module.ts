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
import { ProductPropertyModule } from 'productProperty/productProperty.module'
import { ImageModule } from 'image/image.module'
import { SecureMiddleware } from './middlewares/secure.middleware';
import { ProductService } from 'product/product.service';
import { CategoryService } from 'category/category.service';
import { Product } from 'entities/Product';
import { Category } from 'entities/Category';
import { WishToBuy } from 'entities/wishtobuy';
import { User } from 'entities/User';
import { Image } from 'entities/Image';
import { ImageService } from 'image/image.service';
import { UserService } from 'user/user.service';
import { Address } from 'entities/Address';
import { CartService } from 'cart/cart.service';
import { Cart } from 'entities/Cart';
import { CartDetails } from 'entities/CartDetails';

@Module({
  imports: [UserModule, AuthModule, ImageModule,  ProductModule, CategoryModule, ManufacturerModule, OrderModule, ProductPropertyModule, 
    CartModule, TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Product, Category, WishToBuy, User, Image, Address, Cart, CartDetails])],
  controllers: [AppController],
  components: [ProductService, CategoryService, ImageService, UserService, CartService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
    consumer.apply([SecureMiddleware]).forRoutes({path: '/secured', method: RequestMethod.ALL},
    {path: '/wishlist', method: RequestMethod.ALL}, {path: '/cart', method: RequestMethod.ALL},
    {path: '/product/wishlist', method: RequestMethod.ALL}, {path: '/order', method: RequestMethod.ALL})
  }
}
