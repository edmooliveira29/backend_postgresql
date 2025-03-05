import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Createexpenses1741114841145 implements MigrationInterface {
    name = 'Createexpenses1741114841145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "expenses",
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
                        isNullable: true,
                    },
                    {
                        name: "value",
                        type: "decimal",
                        scale: 2
                    },
                    {
                        name: "limit",
                        type: "decimal",
                        scale: 2
                    },
                    {
                        name: "remaining_balance",
                        type: "decimal",
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "spending_status",
                        type: "enum",
                        enum: ["OK", "ATTENTION", "CRITICAL"],
                        isNullable: false,
                    },
                    {
                        name: "due_date",
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
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            "expenses",
            new TableForeignKey({
                columnNames: ["created_by"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("expenses");

        const createdByForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("created_by")
        )

        if (createdByForeignKey) {
            await queryRunner.dropForeignKey("expenses", createdByForeignKey);
        }

        const expenseGroupForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("expense_group")
        )

        if (expenseGroupForeignKey) {
            await queryRunner.dropForeignKey("expenses", expenseGroupForeignKey);
        }

        await queryRunner.dropTable("expenses")
    }

}
