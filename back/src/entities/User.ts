import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Order} from './Order'
import {WishToBuy} from './wishtobuy'
import {Cart} from './Cart'
import { Address } from "./Address";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    birthdate: Date;

    @Column({ type: "varchar"})
    email: string;

    @Column({ type: "varchar", length: 500})
    password: string;

    @Column({ type: "varchar"})
    phone: string;

    @Column({ type: "tinyint", precision: 1, default: () => 0})
    emailVerified: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    registrationDate: Date; 

    @Column({ type: "varchar"})
    verficationCode: string; 

    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @OneToMany(type => WishToBuy, order => order.user)
    wishlist: WishToBuy[];

    @OneToMany(type => Cart, cart => cart.user)
    carts: Cart[];

    @OneToMany(type => Address, address => address.user)
    addresses: Address[];

    @Column({ type: "tinyint", precision: 1, default: () => 0})
    isAdmin: boolean;
}
