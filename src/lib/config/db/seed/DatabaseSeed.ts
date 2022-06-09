import { RoleEntity } from '../../../entities/RoleEntity';
import { RoleEnum } from '../../../shared/enums';
import { PermissionEntity } from '../../../entities/PermissionEntity';
import { RolePermissionEntity } from '../../../entities/RolePermissionEntity';
import { UserEntity } from '../../../entities/UserEntity';
import { ProductEntity } from '../../../entities/ProductEntity';
import { ProductPriceEntity } from '../../../entities/ProductPriceEntity';

export const getRolesSeed: Partial<RoleEntity>[] = [
  {
    role: RoleEnum.BUYER,
  },
  {
    role: RoleEnum.SELLER,
  },
];

export const getPermissionsSeed: Partial<PermissionEntity>[] = [
  {
    permission: 'product:write',
  },
  {
    permission: 'product:delete',
  },
  {
    permission: 'user:write',
  },
  {
    permission: 'user:read',
  },
  {
    permission: 'user:delete',
  },
  {
    permission: 'deposit:write',
  },
];

export const getUsersSeed = (roles: RoleEntity[]): Partial<UserEntity>[] => [
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.BUYER)!.id,
    username: 'mvpmatchuser1',
    deposit: 100,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    username: 'mvpmatchuser2',
    deposit: 0,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    username: 'mvpmatchuser3',
    deposit: 0,
  },
];

export const getProductsSeed = (sellers: UserEntity[]): Partial<ProductEntity>[] => [
  {
    name: 'Plazma',
    amountAvailable: 10,
    sellerId: sellers[0].id,
  },
  {
    name: 'Jaffa',
    amountAvailable: 20,
    sellerId: sellers[0].id,
  },
  {
    name: 'Cola',
    amountAvailable: 30,
    sellerId: sellers[1].id,
  },
  {
    name: 'Fanta',
    amountAvailable: 5,
    sellerId: sellers[1].id,
  },
];

export const getProductPriceSeed = (products: ProductEntity[]): Partial<ProductPriceEntity>[] => {
  return products.map((product: ProductEntity, index: number) => ({
    price: (index + 1) * 10,
    productId: product.id,
  }));
};

export const getRolePermissionsSeed = (
  roles: RoleEntity[],
  permissions: PermissionEntity[],
): Partial<RolePermissionEntity>[] => [
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.BUYER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:write')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.BUYER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:read')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.BUYER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:delete')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.BUYER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'deposit:write')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:write')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'product:write')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'product:delete')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:read')!.id,
  },
  {
    roleId: roles.find((role: RoleEntity) => role.role === RoleEnum.SELLER)!.id,
    permissionId: permissions.find((permission: PermissionEntity) => permission.permission === 'user:delete')!.id,
  },
];
