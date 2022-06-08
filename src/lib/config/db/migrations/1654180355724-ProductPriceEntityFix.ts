import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductPriceEntityFix1654180355724 implements MigrationInterface {
  name = 'ProductPriceEntityFix1654180355724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
    await queryRunner.query(`ALTER TABLE "public"."product_price" ALTER COLUMN "productId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
    await queryRunner.query(`ALTER TABLE "public"."product_price" ALTER COLUMN "productId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
