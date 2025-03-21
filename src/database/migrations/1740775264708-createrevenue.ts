import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Createrevenue1740775264708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "revenues",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "value",
                        type: "decimal",
                        isNullable: false,
                    },
                    {
                        name: "date",
                        type: "timestamptz",
                        isNullable: true,
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
                        isNullable: true,
                    },
                    {
                        name: "deleted_at",
                        type: "timestamptz",
                        isNullable: true,
                    },
                    {
                        name: "created_by",
                        type: "uuid",
                        isNullable: false,
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("revenues")
    }

}
