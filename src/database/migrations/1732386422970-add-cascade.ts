import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascade1732386422970 implements MigrationInterface {
    name = 'AddCascade1732386422970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8"`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8"`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
