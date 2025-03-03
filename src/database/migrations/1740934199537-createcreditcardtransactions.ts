import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreditCardTransactions1740934199537 implements MigrationInterface {
    name = 'CreateCreditCardTransactions1740934199537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(

            new Table({
                name: "credit_card_transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "transaction_date",
                        type: "timestamptz",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "amount",
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
                    {
                        name: "credit_card_id",
                        type: "uuid",
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "credit_card_transactions",
            new TableForeignKey({
                columnNames: ["created_by"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "credit_card_transactions",
            new TableForeignKey({
                columnNames: ["credit_card_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "credit_cards",
                onDelete: "CASCADE"
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("credit_card_transactions");
    
        const createdByForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("created_by")
        );
    
        const creditCardForeignKey = table?.foreignKeys.find(
            fk => fk.columnNames.includes("credit_card_id")
        );
    
        if (createdByForeignKey) {
            await queryRunner.dropForeignKey("credit_card_transactions", createdByForeignKey);
        }
    
        if (creditCardForeignKey) {
            await queryRunner.dropForeignKey("credit_card_transactions", creditCardForeignKey);
        }
    
        await queryRunner.dropTable("credit_card_transactions");
    }
    

}
