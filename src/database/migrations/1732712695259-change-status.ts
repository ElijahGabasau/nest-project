import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatus1732712695259 implements MigrationInterface {
    name = 'ChangeStatus1732712695259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."offers_status_enum" AS ENUM('active', 'inactive', 'pending')`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "status" "public"."offers_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."offers_status_enum"`);
    }

}
