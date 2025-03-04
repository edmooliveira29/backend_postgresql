import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { PaymentMethods } from './PaymentMethods';


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

  @Column({type : "timestamptz"})
  payment_date: Date | null

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @ManyToOne(() => Users, (user) => user.credit_cards)
  @JoinColumn({ name: "created_by" })
  created_by: Users

  @ManyToOne(() => PaymentMethods, (payment_methods) => payment_methods.payments)
  @JoinColumn({ name: "payments_method" })
  payments_method: PaymentMethods
}