import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Createpaymentmethods1741114888971 implements MigrationInterface {
    name = 'Createpaymentmethods1741114888971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment_methods",
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
                        name: "description",
                        type: "varchar",
                        length: "255",
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

        await queryRunner.createForeignKeys("payment_methods", [
            new TableForeignKey({
               columnNames: ['created_by'],
               referencedColumnNames: ['id'],
               referencedTableName: 'users',
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("payment_methods");

        const createdByForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("created_by")
        )

        if (createdByForeignKey) {
            await queryRunner.dropForeignKey("payment_methods", createdByForeignKey);
        }

        const paymentForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("payments")
        )

        if (paymentForeignKey) {
            await queryRunner.dropForeignKey("payment_methods", paymentForeignKey);
        }

        await queryRunner.dropTable("payment_methods")
    }

}
