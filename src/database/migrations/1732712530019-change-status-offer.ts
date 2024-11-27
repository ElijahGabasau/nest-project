import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusOffer1732712530019 implements MigrationInterface {
    name = 'ChangeStatusOffer1732712530019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" RENAME COLUMN "isActive" TO "attempts"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "attempts"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "attempts" smallint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "attempts"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "attempts" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME COLUMN "attempts" TO "isActive"`);
    }

}
