import {Column, Entity, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { ProductEntity } from './ProductEntity';
import {UserEntity} from "./UserEntity";

@Entity({ name: 'product_price' })
export class ProductPriceEntity extends BaseEntity {
  @Expose()
  @Column()
  price!: number;

  @Expose()
  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.prices, { onDelete: 'CASCADE' })
  product!: ProductEntity;
}
