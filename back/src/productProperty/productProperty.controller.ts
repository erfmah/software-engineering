import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus     } from '@nestjs/common';
import { ProductPropertyService } from './productProperty.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';
import { ProductProperty } from 'entities/ProductProperty';

@Controller('productProperty')
export class ProductPropertyController {
  constructor(private readonly productPropertyService: ProductPropertyService) {}
  
  @Post('create')
  async createProductProperty(@Body() data, @Res() res): Promise<any> {
    let productProperty_already = await this.productPropertyService.findByKeyAndValue(data ['key'], data['value'])
    if(productProperty_already) {
      let result = {};
      result['data'] = {};
      result['status'] = "ProductProperty_already_exist";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
      let data_of = await this.productPropertyService.createProductProperty(data['key'], data['value'], data['type']);
      if(data_of != null) {
        let result = {};
        result['data'] = {};
        result['data']['productProperty'] = data_of;
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

  @Post('add')
  async addProperty(@Body() data, @Res() res): Promise<any> {
      let data_of = await this.productPropertyService.addPropertyToProduct(data['key'], data['value'], data['type'], data['product']);
      if(data_of != null) {
        let result = {};
        result['data'] = {};
        result['data']['productProperty'] = data_of;
        result['status'] = "success";
        res.status(HttpStatus.OK).json(result);
       } else {
        let result = {};
        result['data'] = {};
        result['status'] = "failed";
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
       }
    }

    @Post('searchByProperty')
    async searchByProperty(@Body() data, @Res() res): Promise<any> {
        let data_of = await this.productPropertyService.searchByProperties(data['key'], data['value']);
        if(data_of != null) {
          let result = {};
          result['data'] = {};
          result['data']['productProperty'] = data_of;
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