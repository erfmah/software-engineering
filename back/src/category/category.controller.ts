import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus     } from '@nestjs/common';
import { CategoryService } from './category.service';
import * as bcrypt from 'bcrypt';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post('create')
  async createCategory(@Body() data, @Res() res): Promise<any> {
    let data_of = await this.categoryService.createCategory(data);
    if (data_of != null) {
        let result = {};
        result['data'] = {};
        result['data'] = data_of;
        result['status'] = "success";
        res.status(HttpStatus.OK).json(result);
    } else {
        let result = {};
        result['data'] = {};
        result['status'] = "failed";
        res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
  @Get('all')
  async getAllCategories(): Promise<any> {
    return await this.categoryService.all();
  }


}