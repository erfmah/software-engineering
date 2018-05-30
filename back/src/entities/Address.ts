import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100})
    city: string;

    @Column({ type: "text"})
    address: string;

    @Column({ type: "varchar", length: 20})
    zip: string;

    @Column({ type: "varchar"})
    phone: string;

    @OneToMany(type => Order, order => order.address)
    orders: Order[];

    @ManyToOne(type => User, user => user.addresses)
    user: User;
}
