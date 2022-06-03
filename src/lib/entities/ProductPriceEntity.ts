import { Column, Entity, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { ProductEntity } from './ProductEntity';

@Entity({ name: 'product_price' })
export class ProductPriceEntity extends BaseEntity {
  @Expose()
  @Column()
  price!: number;

  @Expose()
  @Column()
  productId!: string;

  @Expose()
  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.prices, { onDelete: 'CASCADE' })
  product!: ProductEntity;
}
