import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';
import { CreditCardTransactions } from './CreditCardsTransactions';

@Entity()
export class CreditCards {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({
    type: "decimal",
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  limit: number;

  @Column({
    type: "decimal",
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    }
  })
  total_spent: number;


  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @ManyToOne(() => Users, (user) => user.credit_cards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "created_by" })
  created_by: Users

  @OneToMany(() => CreditCardTransactions, (transaction) => transaction.credit_card_id)
  transactions: CreditCards[]
}