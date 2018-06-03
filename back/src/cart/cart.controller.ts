import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus, Req} from '@nestjs/common';
import { CartService } from './cart.service';
import * as bcrypt from 'bcrypt';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() data, @Res() res, @Req() req): Promise<any> {
    if (! await this.cartService.possibleToBuy(data['product'])) {
      await this.cartService.freeNotUsedCarts()
    }
    if (! await this.cartService.possibleToBuy(data['product'])) {
      let result = {};
      result['data'] = {};
      result['status'] = "low_quantity";
      res.status(HttpStatus.OK).json(result);
    } else {
      let data_of = await this.cartService.addToCart(data['product'], req.user.user.id);
      if (data_of != null) {
          await this.cartService.computeCartAmount(data_of.id);
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
  }

}