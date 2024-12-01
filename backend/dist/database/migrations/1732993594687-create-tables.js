"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1732993594687 = void 0;
class CreateTables1732993594687 {
    constructor() {
        this.name = 'CreateTables1732993594687';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "car_brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, CONSTRAINT "PK_cbaa76a620e6e21773085a96bf1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('guest', 'user', 'admin', 'super_admin', 'showroom_admin', 'showroom_super_admin', 'showroom_mechanic')`);
        await queryRunner.query(`CREATE TABLE "users" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text, "account" "public"."users_account_enum" NOT NULL DEFAULT 'basic', "role" "public"."users_role_enum" NOT NULL DEFAULT 'guest', "isHaveSalon" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "permissions" json NOT NULL DEFAULT '[]', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."mechanics_role_enum" AS ENUM('guest', 'user', 'admin', 'super_admin', 'showroom_admin', 'showroom_super_admin', 'showroom_mechanic')`);
        await queryRunner.query(`CREATE TABLE "mechanics" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "experienceInYears" text, "role" "public"."mechanics_role_enum" NOT NULL DEFAULT 'showroom_mechanic', "user_id" uuid NOT NULL, "carShowroom_id" uuid NOT NULL, CONSTRAINT "UQ_301c3b5fa2d49aab65dcfda36a6" UNIQUE ("email"), CONSTRAINT "PK_2c0ed23afc0cc7ff361c17e53df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_showroom" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "email" text NOT NULL, "phone" text, "user_id" uuid NOT NULL, CONSTRAINT "UQ_b659cf8f334b81785d2f7d04652" UNIQUE ("email"), CONSTRAINT "REL_4bdf0e8884f97ff07a426917bb" UNIQUE ("user_id"), CONSTRAINT "PK_43d253875381455394b49051fc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."offers_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TYPE "public"."offers_status_enum" AS ENUM('active', 'inactive', 'pending')`);
        await queryRunner.query(`CREATE TABLE "offers" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "brand" text NOT NULL, "model" text NOT NULL, "year" text, "price" integer NOT NULL DEFAULT '0', "currency" "public"."offers_currency_enum" NOT NULL, "priceInUAH" integer NOT NULL DEFAULT '0', "currencyRate" text NOT NULL, "city" text, "region" text, "image" text, "status" "public"."offers_status_enum" NOT NULL DEFAULT 'pending', "isSalon" boolean NOT NULL DEFAULT false, "attempts" smallint NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, "carShowroom_id" uuid, CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" uuid NOT NULL, CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_4e69c5d1d5ef843a571535ccfde" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mechanics" ADD CONSTRAINT "FK_512faea902b54badc297f0e785b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_showroom" ADD CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_2547a43d7409b85f70d4469c23a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b" FOREIGN KEY ("carShowroom_id") REFERENCES "car_showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_19045d1078870bb15d9b6d1d2b8"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_ba1275a0f4d98ee236ad9e2e67b"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_2547a43d7409b85f70d4469c23a"`);
        await queryRunner.query(`ALTER TABLE "car_showroom" DROP CONSTRAINT "FK_4bdf0e8884f97ff07a426917bba"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_512faea902b54badc297f0e785b"`);
        await queryRunner.query(`ALTER TABLE "mechanics" DROP CONSTRAINT "FK_4e69c5d1d5ef843a571535ccfde"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP TABLE "views"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`DROP TYPE "public"."offers_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."offers_currency_enum"`);
        await queryRunner.query(`DROP TABLE "car_showroom"`);
        await queryRunner.query(`DROP TABLE "mechanics"`);
        await queryRunner.query(`DROP TYPE "public"."mechanics_role_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "car_brand"`);
    }
}
exports.CreateTables1732993594687 = CreateTables1732993594687;
//# sourceMappingURL=1732993594687-create-tables.js.map