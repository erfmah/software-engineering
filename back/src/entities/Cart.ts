import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { CartDetails } from "./CartDetails";
import { User } from "./User";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;

    @Column({ type: "tinyint", precision: 1, default: () => 1})
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    end: Date;

    @Column({ type: "float", default: () => 0})
    amount: number;

    @OneToMany(type => CartDetails, cartDetails => cartDetails.cart)
    cartDetails: CartDetails[];

    @ManyToOne(type => User, user => user.carts)
    user: User;
}
