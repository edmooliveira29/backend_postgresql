import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Expenses } from './Expenses';

enum payment_status {
  PAID = 'PAID',
  LATE = 'LATE',
  TO_PAY = 'TO_PAY'
}

@Entity()
export class Payments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  paid_value: number;

  @Column({ type: "timestamptz", nullable: true })
  payment_date: Date | null;

  @Column({
    type: "enum",
    enum: payment_status,
  })
  payment_status: payment_status;
  @Column({type: 'integer'})
  installment: number

  @Column({ type: "varchar", nullable: true })
  observations: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({ name: "created_by" }) 
  created_by: Users;

  @ManyToOne(() => Expenses, (expense) => expense.payments)
  @JoinColumn({ name: "expense_id" })
  expense_id: Expenses;
}
