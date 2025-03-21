import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Createcreditcard1740923389842 implements MigrationInterface {
    name = 'Createcreditcard1740923389842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(

            new Table({
                name: "credit_cards",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "limit",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "total_spent",
                        type: "decimal",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        isNullable: false,
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamptz",
                        isNullable: true
                    },
                    {
                        name: "deleted_at",
                        type: "timestamptz",
                        isNullable: true,
                    },
                    {
                        name: "created_by",
                        type: "uuid",
                        isNullable: false
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("credit_cards")
    }

}
