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
@Component()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async createOrder(cartId, address, paymentMethod ): Promise<Order> {
    const order = new Order()
    const order_details : OrderDetails[] = []
    const cart = await this.cartRepository.findOne({id: cartId})
    const cart_details = cart.cartDetails
   // let c = new CartDetails();
    for (let c in cart_details){
        const o = new OrderDetails()
        o.price = c.price;
        o.product = c.product
        o.quantity = c.quantity
        o.order = order
        order_details.push(o)
    }
    order.orderDetails = order_details
    order.address =  address
    order.amount = cart.amount
    order.paymentMethod = paymentMethod
    order.user = cart.user

    try {
        return await this.orderRepository.save(order);
    } catch(e) {
      console.log(e)
        return null;
    }
  }

  async findOrder(orderId): Promise<Order> {
      return await this.orderRepository.findOne({id: orderId})
  }

}