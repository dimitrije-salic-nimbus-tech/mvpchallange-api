import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductEntity1653314777374 implements MigrationInterface {
    name = 'ProductEntity1653314777374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL, CONSTRAINT "PK_039c4320ccd5ede07440f499268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productName" character varying NOT NULL, "amountAvailable" integer NOT NULL, "sellerId" uuid NOT NULL, "priceId" uuid NOT NULL, CONSTRAINT "UQ_faeabc94d0778daea8ed0a8a3c5" UNIQUE ("productName"), CONSTRAINT "REL_40e084538467ad26eda659598a" UNIQUE ("priceId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_40e084538467ad26eda659598ac" FOREIGN KEY ("priceId") REFERENCES "product_price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_40e084538467ad26eda659598ac"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_price"`);
    }

}
