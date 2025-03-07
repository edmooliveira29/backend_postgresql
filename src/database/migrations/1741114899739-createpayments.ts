import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Createpayments1741114899739 implements MigrationInterface {
    name = 'Createpayments1741114899739';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "installment",
                        type: "integer"
                    },
                    {
                        name: "paid_value",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "payment_date",
                        type: "timestamptz",
                        isNullable: true,
                    },
                    {
                        name: "payment_status",
                        type: "enum",
                        enum: ["PAID", "LATE", "TO_PAY"],
                        isNullable: false,
                    },
                    {
                        name: "observations",
                        type: "varchar",
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
                    {
                        name: "expense_id",
                        type: "uuid",
                        isNullable: false,
                    }
                ]
            })
        );

        await queryRunner.createForeignKeys(
            "payments",
            [
                new TableForeignKey({
                    columnNames: ["created_by"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                }),
                new TableForeignKey({
                    columnNames: ["expense_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "expenses",
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("payments");

        const createdByForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("created_by")
        );

        if (createdByForeignKey) {
            await queryRunner.dropForeignKey("payments", createdByForeignKey);
        }

        const expenseForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("expense_id")
        );

        if (expenseForeignKey) {
            await queryRunner.dropForeignKey("payments", expenseForeignKey);
        }

        await queryRunner.dropTable("payments");
    }
}
