import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Special {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float"})
    discount: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    start: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    end: Date;

    @Column({ type: "text"})
    desc: string;

    @ManyToOne(type => Product, product => product.offers)
    product: Product;
}
