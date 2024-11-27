import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeLocationNull1732740372947 implements MigrationInterface {
    name = 'MakeLocationNull1732740372947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "region" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "region" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "city" SET NOT NULL`);
    }

}
