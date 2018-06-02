import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post('create')
  async createProduct(@Body() data, @Res() res): Promise<any> {
    let order_already = await this.orderService.findOrder(data ['id'])
    if(order_already) {
      let result = {};
      result['data'] = {};
      result['status'] = "order_already_submitted";
      res.status(HttpStatus.NOT_ACCEPTABLE).json(result);
    } else {
      let data_of = await this.orderService.createOrder(data['cartId'], data['address'], data['paymentMethod']);
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
  
}