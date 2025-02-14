import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeAccessTokenNullable1671234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN access_token DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN access_token SET NOT NULL`);
    }
}
