import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    name: string;

    @ManyToMany(type => Product, product => product.properties)
    products: Product[];
}
