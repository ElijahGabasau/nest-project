import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1732217809708 implements MigrationInterface {
    name = 'FixRelations1732217809708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_7192321b88ff50c117e2c9f7c38"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "FK_22442b26cd5053aee617d0873e5"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_85c0da75e5dedc5eca00055cfbe"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_63ad7be14f0029719971fbb61f8"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "carShowroomId"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP COLUMN "carShowroomId"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "carShowroom_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD "carShowroom_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_2547a43d7409b85f70d4469c23a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_4e69c5d1d5ef843a571535ccfde" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_512faea902b54badc297f0e785b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_512faea902b54badc297f0e785b"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_4e69c5d1d5ef843a571535ccfde"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_2547a43d7409b85f70d4469c23a"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP COLUMN "carShowroom_id"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "carShowroom_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD "carShowroomId" uuid`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "carShowroomId" uuid`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "car_showroom" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_63ad7be14f0029719971fbb61f8" FOREIGN KEY ("carShowroomId") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_85c0da75e5dedc5eca00055cfbe" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "FK_22442b26cd5053aee617d0873e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_7192321b88ff50c117e2c9f7c38" FOREIGN KEY ("carShowroomId") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
