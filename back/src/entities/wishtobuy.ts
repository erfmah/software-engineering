import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class WishToBuy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date: Date;

    @ManyToOne(type => User, user => user.wishlist)
    user: User;

    @ManyToOne(type => Product, product => product.wishToBuys)
    product: Product;

}
