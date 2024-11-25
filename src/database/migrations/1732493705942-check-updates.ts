import { MigrationInterface, QueryRunner } from "typeorm";

export class CheckUpdates1732493705942 implements MigrationInterface {
    name = 'CheckUpdates1732493705942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_512faea902b54badc297f0e785b"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_512faea902b54badc297f0e785b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_512faea902b54badc297f0e785b"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_512faea902b54badc297f0e785b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
