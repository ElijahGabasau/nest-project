import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDeleteUser1732393552626 implements MigrationInterface {
    name = 'FixDeleteUser1732393552626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deleted" TO "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isDeleted" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isDeleted" TO "deleted"`);
    }

}
