import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { PaymentMethods } from './PaymentMethods';
import { Expenses } from './Expenses';


@Entity()
export class Payments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  paid_value: number;

  @Column({ type: "timestamptz" })
  payment_date: Date | null

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({ name: "created_by" })
  created_by: Users

  @ManyToOne(() => PaymentMethods, (payment_methods) => payment_methods.payments)
  @JoinColumn({ name: "payment_method_id" })
  payment_method_id: PaymentMethods

  @ManyToOne(() => Expenses, (expense) => expense.payment_id)
  @JoinColumn({ name: "expense_id" })
  expense_id: Expenses
}