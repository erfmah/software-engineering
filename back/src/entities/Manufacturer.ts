import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Manufacturer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100})
    name: string;

    @Column({ type: "varchar", length: 100})
    site: string;

    @Column({ type: "varchar", length: 100})
    phone: string;

    @OneToMany(type => Product, product => product.manufacturer)
    products: Product[];

}
