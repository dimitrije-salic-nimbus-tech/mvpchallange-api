import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductEntityPriceUpdate1653383509517 implements MigrationInterface {
  name = 'ProductEntityPriceUpdate1653383509517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_40e084538467ad26eda659598ac"`);
    await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "REL_40e084538467ad26eda659598a"`);
    await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "priceId"`);
    await queryRunner.query(`ALTER TABLE "public"."product_price" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "public"."product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
    await queryRunner.query(`ALTER TABLE "public"."product_price" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "public"."product" ADD "priceId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD CONSTRAINT "REL_40e084538467ad26eda659598a" UNIQUE ("priceId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD CONSTRAINT "FK_40e084538467ad26eda659598ac" FOREIGN KEY ("priceId") REFERENCES "product_price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
