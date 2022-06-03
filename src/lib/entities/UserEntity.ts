import { Column, Entity, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { RoleEnum } from '../shared/enums';
import { ProductEntity } from './ProductEntity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Expose()
  @Column({ unique: true })
  username!: string;

  @Expose()
  @Column({ default: 0 })
  deposit!: number;

  @Expose()
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.BUYER })
  role!: RoleEnum; // TODO: buyer and seller two entities (oneToOne relation with user)

  @Expose()
  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.seller)
  myProducts!: ProductEntity[];
}
