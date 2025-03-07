import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { ExpenseGroups } from './ExpenseGroups';
import { Payments } from './Payments';

enum spending_status {
  OK = 'OK',
  ATTENTION = 'ATTENTION',
  CRITICAL = 'CRITICAL'
}

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  value: number;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  limit: number;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  remaining_balance: number;

  @Column({ type: "timestamptz", nullable: true })
  due_date: Date | null;

  @Column({
    type: "enum",
    enum: spending_status,
    nullable: true
  })
  spending_status: spending_status;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Users, (user) => user.expenses)
  @JoinColumn({ name: "created_by" })
  created_by: Users;

  @ManyToOne(() => ExpenseGroups, (expense_groups) => expense_groups.expenses)
  @JoinColumn({ name: "expense_group_id" })
  expense_group_id: ExpenseGroups;

  @OneToMany(() => Payments, (payment) => payment.expense_id)
  payments: Payments[];
}
