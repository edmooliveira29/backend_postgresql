import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class CreditCards {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  limit: string;

  @Column({ length: 255 })
  total_spent: string;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @ManyToOne(() => Users, (user) => user.credit_cards, { onDelete: "CASCADE" })
  @JoinColumn({ name: "created_by" })
  created_by: Users
}