import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductEntityNamePropertyUpdate1653376237133 implements MigrationInterface {
    name = 'ProductEntityNamePropertyUpdate1653376237133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "productName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME CONSTRAINT "UQ_faeabc94d0778daea8ed0a8a3c5" TO "UQ_22cc43e9a74d7498546e9a63e77"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" TO "UQ_faeabc94d0778daea8ed0a8a3c5"`);
        await queryRunner.query(`ALTER TABLE "public"."product" RENAME COLUMN "name" TO "productName"`);
    }

}
