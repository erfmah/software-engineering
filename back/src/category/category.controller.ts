import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus     } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post('create')
  async createCategory(@Body() data, @Res() res): Promise<any> {
    let category_already = await this.categoryService.findByName(data ['name'])
    if(category_already) {
      let result = {};
      result['data'] = {};
      result['status'] = "category_already_exist";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
      let data_of = await this.categoryService.createCategory(data);
      if(data_of != null) {
        let result = {};
        result['data'] = {};
        result['data']['category'] = data_of;
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
}