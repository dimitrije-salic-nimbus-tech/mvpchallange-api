import { Column, Entity, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from './BaseEntity';
import { RoleEntity } from './RoleEntity';
import { PermissionEntity } from './PermissionEntity';

@Entity({ name: 'role_permission' })
export class RolePermissionEntity extends BaseEntity {
  @Expose()
  @Column()
  roleId!: string;

  @Expose()
  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.rolePermissions, { onDelete: 'CASCADE' })
  role!: RoleEntity;

  @Expose()
  @Column()
  permissionId!: string;

  @Expose()
  @ManyToOne(() => PermissionEntity, (permission: PermissionEntity) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  permission!: PermissionEntity;
}
