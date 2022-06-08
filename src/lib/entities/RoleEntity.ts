import { Column, Entity, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { RoleEnum } from '../shared/enums';
import { RolePermissionEntity } from './RolePermissionEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Expose()
  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  role!: RoleEnum;

  @Expose()
  @OneToMany(() => RolePermissionEntity, (rolePermission: RolePermissionEntity) => rolePermission.role)
  rolePermissions!: RolePermissionEntity[];

  @Expose()
  @OneToMany(() => UserEntity, (user: UserEntity) => user.role)
  users!: UserEntity[];
}
