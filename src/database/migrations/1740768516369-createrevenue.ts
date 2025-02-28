import { MigrationInterface, QueryRunner } from "typeorm";

export class Createrevenue1740768516369 implements MigrationInterface {
    name = 'Createrevenue1740768516369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "revenue" ("id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "value" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" uuid, CONSTRAINT "PK_843523949384ce16042013dacc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "revenue" ADD CONSTRAINT "FK_fe61e52030f8867623bda965503" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revenue" DROP CONSTRAINT "FK_fe61e52030f8867623bda965503"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "revenue"`);
    }

}
