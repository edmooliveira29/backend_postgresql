import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { CreditCards } from './CreditCards';

@Entity()
export class CreditCardTransactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  amount: number;

  @Column({ type: "timestamptz" })
  transaction_date: Date | null

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @ManyToOne(() => Users, (user) => user.credit_card_transactions)
  @JoinColumn({ name: "created_by" })
  created_by: Users

  @ManyToOne(() => CreditCards, (credit_card) => credit_card.transactions)
  @JoinColumn({ name: "credit_card_id" })
  credit_card_id: CreditCards
}