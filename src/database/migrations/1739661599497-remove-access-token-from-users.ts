import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAccessTokenFromUsers1739661599497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN access_token`);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN access_token VARCHAR(255)`);
    }

}
