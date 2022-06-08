import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { UserEntity } from './UserEntity';
import { ProductPriceEntity } from './ProductPriceEntity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @Expose()
  @Column({ unique: true })
  name!: string;

  @Expose()
  @Column()
  amountAvailable!: number;

  @Expose()
  @Column()
  sellerId!: string;

  @Expose()
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.myProducts, { onDelete: 'CASCADE' })
  seller!: UserEntity;

  @Expose()
  @OneToMany(() => ProductPriceEntity, (productPrice: ProductPriceEntity) => productPrice.product)
  prices!: ProductPriceEntity[];
}
