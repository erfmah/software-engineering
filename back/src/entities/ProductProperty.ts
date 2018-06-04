import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductProperty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    type: string;

    @Column({ type: "varchar"})
    key: string;

    @Column({ type: "varchar"})
    value: string;

    @ManyToMany(type => Product, product => product.properties)
    products: Product[];

    
}
