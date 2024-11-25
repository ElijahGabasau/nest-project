import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCarEntity1732578431550 implements MigrationInterface {
    name = 'FixCarEntity1732578431550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, CONSTRAINT "PK_cbaa76a620e6e21773085a96bf1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car_brand"`);
    }

}
