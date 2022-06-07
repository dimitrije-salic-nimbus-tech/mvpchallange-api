import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  getPermissionsSeed,
  getProductPriceSeed,
  getProductsSeed,
  getRolePermissionsSeed,
  getRolesSeed,
  getUsersSeed,
} from '../seed/DatabaseSeed';
import { RoleEntity } from '../../../entities/RoleEntity';
import { PermissionEntity } from '../../../entities/PermissionEntity';
import { UserEntity } from '../../../entities/UserEntity';
import { RoleEnum } from '../../../shared/enums';
import { ProductEntity } from '../../../entities/ProductEntity';

export class DatabaseSeed1654585415579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role', Object.keys(getRolesSeed[0]))
      .values(getRolesSeed)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('permission', Object.keys(getPermissionsSeed[0]))
      .values(getPermissionsSeed)
      .returning('id')
      .execute();

    const roles: RoleEntity[] = await queryRunner.manager.getRepository(RoleEntity).find();
    const permissions: PermissionEntity[] = await queryRunner.manager.getRepository(PermissionEntity).find();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role_permission', Object.keys(getRolePermissionsSeed(roles, permissions)[0]))
      .values(getRolePermissionsSeed(roles, permissions))
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user', Object.keys(getUsersSeed(roles)[0]))
      .values(getUsersSeed(roles))
      .returning('id')
      .execute();

    const users: UserEntity[] = await queryRunner.manager.getRepository(UserEntity).find({ relations: ['role'] });
    const sellers: UserEntity[] = users.filter((user: UserEntity) => user.role.role === RoleEnum.SELLER);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product', Object.keys(getProductsSeed(sellers)[0]))
      .values(getProductsSeed(sellers))
      .returning('id')
      .execute();

    const products: ProductEntity[] = await queryRunner.manager.getRepository(ProductEntity).find();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product_price', Object.keys(getProductPriceSeed(products)[0]))
      .values(getProductPriceSeed(products))
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('product_price').execute();
    await queryRunner.manager.createQueryBuilder().delete().from('product').execute();
    await queryRunner.manager.createQueryBuilder().delete().from('user').execute();
    await queryRunner.manager.createQueryBuilder().delete().from('role_permission').execute();
    await queryRunner.manager.createQueryBuilder().delete().from('permission').execute();
    await queryRunner.manager.createQueryBuilder().delete().from('role').execute();
  }
}
