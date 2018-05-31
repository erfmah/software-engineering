import { Controller, Get, UseGuards, Post, Body, Res, HttpStatus     } from '@nestjs/common';
import { CartService } from './cart.service';
import * as bcrypt from 'bcrypt';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


}