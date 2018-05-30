import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100})
    name: string;

    @OneToMany(type => Product, product => product.category) // note: we will create author property in the Photo class below
    products: Category[];

}
