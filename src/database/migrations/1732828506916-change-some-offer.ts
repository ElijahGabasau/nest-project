import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSomeOffer1732828506916 implements MigrationInterface {
    name = 'ChangeSomeOffer1732828506916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
