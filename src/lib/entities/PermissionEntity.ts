import { Column, Entity, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { PermissionActionType } from '../shared/types';
import { RolePermissionEntity } from './RolePermissionEntity';

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity {
  @Expose()
  @Column({ unique: true })
  permission!: PermissionActionType;

  @Expose()
  @OneToMany(() => RolePermissionEntity, (rolePermission: RolePermissionEntity) => rolePermission.permission)
  rolePermissions!: RolePermissionEntity[];
}
