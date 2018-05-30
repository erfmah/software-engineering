import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float"})
    price: number;

    @Column({ type: "int"})
    quantity: number;

    @ManyToOne(type => Product, product => product.orderDetails)
    product: Product;

    @ManyToOne(type => Order, order => order.orderDetails)
    order: Order;
}   
