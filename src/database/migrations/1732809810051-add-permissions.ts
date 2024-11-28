import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissions1732809810051 implements MigrationInterface {
    name = 'AddPermissions1732809810051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "permissions" json NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissions"`);
    }

}
