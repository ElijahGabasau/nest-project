import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelations1732461589745 implements MigrationInterface {
    name = 'ChangeRelations1732461589745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mechanics" RENAME COLUMN "experience" TO "experienceInYears"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "UQ_4bdf0e8884f97ff07a426917bba" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "UQ_4bdf0e8884f97ff07a426917bba"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" RENAME COLUMN "experienceInYears" TO "experience"`);
    }

}
