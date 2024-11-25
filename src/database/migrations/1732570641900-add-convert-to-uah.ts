import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConvertToUah1732570641900 implements MigrationInterface {
    name = 'AddConvertToUah1732570641900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ADD "priceInUAH" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "currencyRate" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "currencyRate"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "priceInUAH"`);
    }

}
