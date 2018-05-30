import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany, OneToOne} from "typeorm";
import {Category} from "./Category";
import {Image} from "./Image";
import {ProductProperty} from "./ProductProperty";
import { Tag } from "./Tag";
import { OrderDetails } from "./OrderDetails";
import { CartDetails } from "./CartDetails";
import { Special } from "./Special";
import { WishToBuy } from "./wishtobuy";
import { Manufacturer } from "./Manufacturer";


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200 })
    name: string;

    @Column({ type: "float"})
    price: number;

    @Column({ type: "float"})
    weight: number;

    @Column({ type: "text"})
    longDesc: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updateDate: Date;

    @Column({ type: "float"})
    productStock: number;

    @Column({ type: "tinyint", precision: 1})
    live: boolean;

    @ManyToOne(type => Category, category => category.products) // note: we will create author property in the Photo class below
    category: Category;

    @OneToMany(type => Image, image => image.product) // note: we will create author property in the Photo class below
    images: Image[];

    @ManyToMany(type => ProductProperty, productProperty => productProperty.products)
    @JoinTable()
    properties: ProductProperty[];

    @ManyToMany(type => Tag, tag => tag.products)
    @JoinTable()
    tags: Tag[];

    @OneToMany(type => OrderDetails, orderDetails => orderDetails.product) // note: we will create author property in the Photo class below
    orderDetails: OrderDetails[];

    @OneToMany(type => Special, special => special.product) // note: we will create author property in the Photo class below
    offers: Special[]

    @OneToMany(type => WishToBuy, wishToBuy => wishToBuy.product)
    wishToBuys: WishToBuy[];

    @OneToMany(type => CartDetails, cartDetails => cartDetails.product) // note: we will create author property in the Photo class below
    cartDetails: CartDetails[];

    @ManyToOne(type => Manufacturer, manufacturer => manufacturer.products)
    manufacturer: Manufacturer;
}
