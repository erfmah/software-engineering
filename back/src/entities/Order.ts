import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { Address } from "./Address";
import { OrderDetails } from "./OrderDetails";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float"})
    amount: number;

    @Column({ type: "float"})
    shipping: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    orderDate: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    shippingDate: Date;

    @Column({ type: "tinyint", precision: 1})
    shipped: boolean;

    @Column({ type: "tinyint", precision: 1})
    paymentMethod: boolean;

    @ManyToOne(type => User, user => user.orders)
    user: User;

    @ManyToOne(type => Address, address => address.orders)
    address: Address;

    @OneToMany(type => OrderDetails, orderDetails => orderDetails.order)
    orderDetails: OrderDetails[];
}
