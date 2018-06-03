import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Category } from 'entities/Category';
import { User } from 'entities/User';
import { Order } from 'entities/Order'
import { Cart } from 'entities/Cart';
import { OrderDetails } from 'entities/OrderDetails'
import { Address} from 'entities/Address'
import { CartDetails } from 'entities/CartDetails';
import { timingSafeEqual } from 'crypto';
@Component()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(CartDetails)
    private readonly cartDetailsRepository: Repository<CartDetails>,
  ) {}

  async createOrder(cartId, address, paymentMethod ): Promise<Order> {
    const order = new Order()
    const order_details : OrderDetails[] = []
    const cart = await this.cartRepository.createQueryBuilder("cart")
                                          .where("cart.id = :id", {id: cartId})
                                          .leftJoinAndSelect("cart.user", "User")
                                          .getOne()

    const cart_details = await this.cartDetailsRepository.createQueryBuilder("cartDetails")
                                                         .where("cartDetails.cartId = :id", {id: cartId})
                                                         .leftJoinAndSelect("cartDetails.product", "Product")
                                                         .getMany()
    order.address =  address
    order.amount = cart.amount
    order.paymentMethod = paymentMethod
    order.user = cart.user
    try {
      await this.orderRepository.save(order);
    } catch(e) {
      console.log(e)
      return null;
    }
    for (let c of cart_details){
      const o = new OrderDetails()
      o.price = c.price;
      o.product = c.product
      o.quantity = c.quantity
      o.order = order
      try {
        await this.orderDetailsRepository.save(o)
      } catch(e) {
        console.log(e)
        return null;
      }
      order_details.push(o)
    }
    order.orderDetails = order_details
    cart.ordered = true
    try {
      await this.cartRepository.save(cart)
      await this.orderRepository.save(order);
    } catch(e) {
      console.log(e)
      return null;
    }
    return order
  }

  async findOrder(orderId): Promise<Order> {
      return await this.orderRepository.findOne({id: orderId})
  }

}