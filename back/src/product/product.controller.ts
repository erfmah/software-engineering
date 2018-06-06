import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req, Session, UseInterceptors, FilesInterceptor, UploadedFiles, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(@Body() data, @Res() res, @UploadedFiles() files): Promise<any> {
    data['images'] = files
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
        result['data']['product'] = {id: data_of.id};
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
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('addWishS')
  async addToWishListSession(@Body() data, @Res() res, @Req() req, @Session() session): Promise<any> {
    let wishItem = await this.productService.addToWishList(session.user.id, data['product'])
    if(wishItem == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "product_already_exist_in_wishList";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['wishToBuy'] = wishItem;
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Get('wishlist/add/:id')
  async addToWishListSessionGet(@Body() data, @Res() res, @Req() req, @Session() session, @Param() params, @Query() query): Promise<any> {
    let wishItem = await this.productService.addToWishList(session.user.id, params.id)
    if(wishItem == null) {
      // res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
      res.redirect(query.redirect)
    } else{
      // res.status(HttpStatus.OK).json(result);
      res.redirect(query.redirect)
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
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }
  
  @Post('findByManufacturer')
  async findProductsByManufacturer(@Body() data, @Res() res): Promise<any> {
    let products = await this.productService.findByManufacturer(data['manufacturer'])
    if(products == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "there_is_no_product";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['manufacturer'] = products;
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('findByCategory')
  async findProductsByCategory(@Body() data, @Res() res): Promise<any> {
    let products = await this.productService.findByCategory(data['category'])
    if(products == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "there_is_no_product";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['category'] = products;
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('searchByName')
  async searchByName(@Body() data, @Res() res): Promise<any> {
    let products = await this.productService.searchByName(data['name'])
    if(products == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "there_is_no_product";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['name'] = products;
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }

  @Post('getProperties')
  async getProperties(@Body() data, @Res() res): Promise<any> {
    let properties = await this.productService.getProperties(data['id'])
    if(properties == null) {
      let result = {};
      result['data'] = {};
      result['status'] = "there_is_no_property";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else{
      let result = {};
      result['data'] = {};
      result['data']['properties'] = properties;
      result['status'] = "success";
      res.status(HttpStatus.OK).json(result);
    }
  }
}