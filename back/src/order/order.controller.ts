import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req, Param, Session } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt';
import { UserService } from 'user/user.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly userService: UserService) {}
  
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

  @Get('create/:id')
  async createOrderGet(@Body() data, @Res() res, @Param() param, @Session() session): Promise<any> {

    const user = await this.userService.findById(session.user.id)
    let data_of = await this.orderService.createOrder(param.id, user.addresses[0].id, 1);
    if(data_of != null) {
      let result = {};
      result['data'] = {};
      result['data']['order'] = {id: data_of.id, amount: data_of.amount}
      result['status'] = "success";
      //res.status(HttpStatus.OK).json(result);
      res.redirect("/")
    } else {
      let result = {};
      result['data'] = {};
      result['status'] = "failed";
      //res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
      res.redirect("/order")
    }
  }
  
  
}