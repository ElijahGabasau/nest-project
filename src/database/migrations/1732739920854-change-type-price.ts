import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypePrice1732739920854 implements MigrationInterface {
    name = 'ChangeTypePrice1732739920854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "priceInUAH"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "priceInUAH" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "priceInUAH"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "priceInUAH" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "price" smallint NOT NULL DEFAULT '0'`);
    }

}
