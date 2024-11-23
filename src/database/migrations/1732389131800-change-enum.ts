import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnum1732389131800 implements MigrationInterface {
    name = 'ChangeEnum1732389131800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'super_admin', 'showroom_admin', 'showroom_super_admin', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."mechanics_role_enum" RENAME TO "mechanics_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum" AS ENUM('user', 'admin', 'super_admin', 'showroom_admin', 'showroom_super_admin', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" TYPE "public"."mechanics_role_enum" USING "role"::"text"::"public"."mechanics_role_enum"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" SET DEFAULT 'showroom_mechanic'`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum_old" AS ENUM('user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" TYPE "public"."mechanics_role_enum_old" USING "role"::"text"::"public"."mechanics_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "mechanics" ALTER COLUMN "role" SET DEFAULT 'showroom_mechanic'`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."mechanics_role_enum_old" RENAME TO "mechanics_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
    }


}
