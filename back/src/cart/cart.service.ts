import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/Cart';
import * as bcrypt from 'bcrypt';
import { CartDetails } from 'entities/CartDetails';
import { Product } from 'entities/Product';

@Component()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartDetailsRepository: Repository<CartDetails>,
    private readonly productRepository: Repository<Product>,
  ) {}

  async possibleToBuy(product, quantity = 1): Promise<Boolean> {
    const foundProduct = await this.productRepository.findOne(product)
    if (foundProduct.productStock >= quantity) {
      return true;
    } else {
      return false;
    }
  }

  async findActiveCarts(): Promise<Cart> {
    const now = new Date()
    const carts = await this.cartRepository.createQueryBuilder("cart")
                                      .where("cart.end > :now AND ", {now: now})
                                      .andWhere("active = 1")
                                      .orderBy("id", "DESC")
                                      .limit(1)
                                      .leftJoinAndSelect("cart.cartDetails", "CartDetails")
                                      .getOne()
    return carts;
  }

  async deleteFromCart(product, quantity, user): Promise<CartDetails> {
    const cart = await this.createCart(user)
    if (cart) {
      const cartDetail = await this.cartDetailsRepository.findOne({cart, product})
      if (cartDetail) {
        try {
          return await this.cartDetailsRepository.remove(cartDetail)
        } catch(e) {
          console.log(e)
          return null
        }
      } else {
          return null
      }
    } else {
      return null
    }

  }

  async setProductQuantityToCart(product, quantity, user): Promise<CartDetails> {
    const cart = await this.createCart(user)
    if (cart) {
      const cartDetail = await this.cartDetailsRepository.findOne({cart, product})
      if (cartDetail) {
        cartDetail.quantity = quantity
        try {
          return await this.cartDetailsRepository.save(cartDetail)
        } catch(e) {
          console.log(e)
          return null
        }
      } else {
        const newCartDetail = new CartDetails()
        newCartDetail.cart = cart
        newCartDetail.price = product.price
        newCartDetail.product = product
        newCartDetail.quantity = quantity
        try {
          return await this.cartDetailsRepository.save(newCartDetail)
        } catch(e) {
          console.log(e)
          return null
        }
      }
    } else {
      return null
    }

  }


  async addToCart(product, user): Promise<CartDetails> {
    const cart = await this.createCart(user)
    if (cart) {
      const cartDetail = await this.cartDetailsRepository.findOne({cart, product})
      if (cartDetail) {
        cartDetail.quantity = cartDetail.quantity + 1
        try {
          return await this.cartDetailsRepository.save(cartDetail)
        } catch(e) {
          console.log(e)
          return null
        }
      } else {
        const newCartDetail = new CartDetails()
        newCartDetail.cart = cart
        newCartDetail.price = product.price
        newCartDetail.product = product
        newCartDetail.quantity = 1
        try {
          return await this.cartDetailsRepository.save(newCartDetail)
        } catch(e) {
          console.log(e)
          return null
        }
      }
    } else {
      return null
    }

  }

  async createCart(user): Promise<Cart> {
    const carts = this.findActiveCarts()
    if (carts) {
      return carts;
    } else {
      const cart = new Cart()
      cart.user = user
      const d = new Date()
      d.setDate(d.getDate() + 1)
      cart.end = d
      try {
        return await this.cartRepository.save(cart)
      } catch(e) {
        console.log(e)
        return null
      }
    }
      
  }

}