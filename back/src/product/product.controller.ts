import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post('create')
  async createProduct(@Body() data, @Res() res): Promise<any> {
    let product_already = await this.productService.findByName(data ['name'])
    if(product_already) {
      let result = {};
      result['data'] = {};
      result['status'] = "product_already_exist";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
      let data_of = await this.productService.createProduct(data);
      if(data_of != null) {
        let result = {};
        result['data'] = {};
        result['data']['product'] = data_of;
        result['status'] = "success";
        res.status(HttpStatus.OK).json(result);
       } else {
        let result = {};
        result['data'] = {};
        result['status'] = "failed";
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
       }
    }
  }

  @Post('addWish')
  async addToWishList(@Body() data, @Res() res, @Req() req): Promise<any> {
    let wishItem = await this.productService.addToWishList(req.user.user.id, data['product'])
    if(wishItem == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "product_already_exist_in_wishList";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['wishToBuy'] = wishItem;
      console.log(wishItem)
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('removeWish')
  async removeFromWishList(@Body() data, @Res() res): Promise<any> {
    let removedWish = await this.productService.removeFromWishList(data['id'])
    if(removedWish == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "product_does_not_exist_in_wishList";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['wishToBuy'] = removedWish;
      console.log(removedWish)
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }
  
}