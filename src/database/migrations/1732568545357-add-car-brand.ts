import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarBrand1732568545357 implements MigrationInterface {
    name = 'AddCarBrand1732568545357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, CONSTRAINT "PK_ee4355345e0e1c18cb6efa2bd5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "brand"`);
        await queryRunner.query(`DROP TYPE "public"."offers_brand_enum"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "brand" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "brand"`);
        await queryRunner.query(`CREATE TYPE "public"."offers_brand_enum" AS ENUM('BMW', 'AUDI', 'MERCEDES', 'VOLKSWAGEN', 'TOYOTA', 'HONDA', 'FORD', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'KIA', 'MAZDA', 'PEUGEOT', 'CITROEN', 'RENAULT', 'FIAT', 'OPEL', 'VOLVO', 'SKODA', 'SEAT', 'MINI', 'JEEP', 'LAND ROVER', 'PORSHE', 'JAGUAR', 'LEXUS', 'DEAWOO')`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "brand" "public"."offers_brand_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "car_models"`);
    }

}
