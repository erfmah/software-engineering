import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float"})
    price: number;

    @Column({ type: "int"})
    quantity: number;

    @ManyToOne(type => Product, product => product.cartDetails)
    product: Product;

    @ManyToOne(type => Cart, cart => cart.cartDetails)
    cart: Cart;
}
