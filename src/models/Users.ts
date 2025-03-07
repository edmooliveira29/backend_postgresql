
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn
} from "typeorm";

import * as models from "./index"

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ unique: true, length: 255 })
    email: string;
    @Column({ length: 255, })
    password: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date | null;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    updated_at: Date | null;

    @DeleteDateColumn({ type: "timestamptz", nullable: true })
    deleted_at: Date | null;

    @OneToMany(() => models.Revenues, (revenue) => revenue.created_by)
    revenues: models.Revenues[];

    @OneToMany(() => models.CreditCards, (credit_card) => credit_card.created_by)
    credit_cards: models.CreditCards[]

    @OneToMany(() => models.CreditCardTransactions, (credit_card_transaction) => credit_card_transaction)
    credit_card_transactions: models.CreditCardTransactions

    @OneToMany(() => models.ExpenseGroups, (expense_group) => expense_group.created_by)
    expense_groups: models.ExpenseGroups[]

    @OneToMany(() => models.Expenses, (expense) => expense.created_by)
    expenses: models.Expenses[]

    @OneToMany(() => models.Payments, (payment) => payment.created_by)
    payments: models.Payments
}
