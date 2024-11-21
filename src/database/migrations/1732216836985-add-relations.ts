import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1732216836985 implements MigrationInterface {
    name = 'AddRelations1732216836985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ADD "carShowroomId" uuid`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_7192321b88ff50c117e2c9f7c38" FOREIGN KEY ("carShowroomId") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_7192321b88ff50c117e2c9f7c38"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "carShowroomId"`);
    }

}
