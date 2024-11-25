import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeFix1732571163432 implements MigrationInterface {
    name = 'AddSomeFix1732571163432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b"`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "carShowroom_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b"`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "carShowroom_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
