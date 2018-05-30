import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100})
    alt: string;

    @Column({ type: "varchar", length: 100})
    path: string;

    @ManyToOne(type => Product, product => product.images) // note: we will create author property in the Photo class below
    product: Product;

}
