import { MigrationInterface, QueryRunner } from "typeorm";

export class Createcreditcard1740923389842 implements MigrationInterface {
    name = 'Createcreditcard1740923389842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credit_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "limit" character varying(255) NOT NULL, "total_spent" character varying(255) NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, CONSTRAINT "PK_7749b596e358703bb3dd8b45b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ADD CONSTRAINT "FK_374042927c583dd6c37b11e40f1" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit_cards" ADD CONSTRAINT "FK_77796622568b83a3e3aab6b3d09" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit_cards" DROP CONSTRAINT "FK_77796622568b83a3e3aab6b3d09"`);
        await queryRunner.query(`ALTER TABLE "revenues" DROP CONSTRAINT "FK_374042927c583dd6c37b11e40f1"`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "credit_cards"`);
    }

}
