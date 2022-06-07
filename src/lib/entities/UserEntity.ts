import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { ProductEntity } from './ProductEntity';
import { RoleEntity } from './RoleEntity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Expose()
  @Column({ unique: true })
  username!: string;

  @Expose()
  @Column({ default: 0 })
  deposit!: number;

  @Expose()
  @Column()
  roleId!: string;

  @Expose()
  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.users, { onDelete: 'CASCADE' })
  role!: RoleEntity;

  @Expose()
  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.seller)
  myProducts!: ProductEntity[];
}
