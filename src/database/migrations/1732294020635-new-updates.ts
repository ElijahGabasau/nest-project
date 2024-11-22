import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUpdates1732294020635 implements MigrationInterface {
    name = 'NewUpdates1732294020635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" uuid NOT NULL, CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."mechanics_role_enum" RENAME TO "mechanics_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum" AS ENUM('user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" TYPE "public"."mechanics_role_enum" USING "role"::"text"::"public"."mechanics_role_enum"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" SET DEFAULT 'showroom_mechanic'`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8"`);
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum_old" AS ENUM('customer', 'user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" TYPE "public"."mechanics_role_enum_old" USING "role"::"text"::"public"."mechanics_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" SET DEFAULT 'showroom_mechanic'`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."mechanics_role_enum_old" RENAME TO "mechanics_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('customer', 'user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "views"`);
    }

}
