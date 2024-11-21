import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBasicTables1732201555669 implements MigrationInterface {
    name = 'AddBasicTables1732201555669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum" AS ENUM('customer', 'user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`CREATE TABLE "mechanics" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "experience" text, "role" "public"."mechanics_role_enum" NOT NULL DEFAULT 'showroom_mechanic', CONSTRAINT "UQ_301c3b5fa2d49aab65dcfda36a6" UNIQUE ("email"), CONSTRAINT "PK_2c0ed23afc0cc7ff361c17e53df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_showroom" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "email" text NOT NULL, "phone" text, CONSTRAINT "UQ_b659cf8f334b81785d2f7d04652" UNIQUE ("email"), CONSTRAINT "PK_43d253875381455394b49051fc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."offers_brand_enum" AS ENUM('BMW', 'AUDI', 'MERCEDES', 'VOLKSWAGEN', 'TOYOTA', 'HONDA', 'FORD', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'KIA', 'MAZDA', 'PEUGEOT', 'CITROEN', 'RENAULT', 'FIAT', 'OPEL', 'VOLVO', 'SKODA', 'SEAT', 'MINI', 'JEEP', 'LAND ROVER', 'PORSHE', 'JAGUAR', 'LEXUS', 'DEAWOO')`);
        await queryRunner.query(`CREATE TYPE "public"."offers_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TABLE "offers" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "brand" "public"."offers_brand_enum" NOT NULL, "model" text NOT NULL, "year" text, "price" text NOT NULL, "currency" "public"."offers_currency_enum" NOT NULL, "city" text NOT NULL, "region" text NOT NULL, "image" text, "isActive" boolean NOT NULL DEFAULT true, "isSalon" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "account" "public"."users_account_enum" NOT NULL DEFAULT 'basic'`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'user', 'manager', 'admin', 'showroom_admin', 'showroom_manager', 'showroom_mechanic')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isHaveSalon" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isHaveSalon"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`DROP TYPE "public"."offers_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."offers_brand_enum"`);
        await queryRunner.query(`DROP TABLE "car_showroom"`);
        await queryRunner.query(`DROP TABLE "mechanics"`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum"`);
    }

}
