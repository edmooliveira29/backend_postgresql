import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Createexpensegroups1741114839291 implements MigrationInterface {
    name = 'Createexpensegroups1741114839291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "expense_groups",
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
                        name: "total_spent",
                        type: "decimal",
                        scale: 2
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
                        isNullable: false
                    },
                ]
            })
        )
        await queryRunner.createForeignKey(
            "expense_groups",
            new TableForeignKey({
                columnNames: ["created_by"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
            })
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> { 
        const table = await queryRunner.getTable("expense_groups");

        const createdByForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("created_by")
        )

        if (createdByForeignKey) {
            await queryRunner.dropForeignKey("expense_groups", createdByForeignKey);
        }

        await queryRunner.dropTable("expense_groups")
    }

}
