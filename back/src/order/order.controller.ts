import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post('create')
  async createOrder(@Body() data, @Res() res): Promise<any> {


    let data_of = await this.orderService.createOrder(data['cartId'], data['address'], data['paymentMethod']);
    if(data_of != null) {
      let result = {};
      result['data'] = {};
      result['data']['order'] = {id: data_of.id, amount: data_of.amount}
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