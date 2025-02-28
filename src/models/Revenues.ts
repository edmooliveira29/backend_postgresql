// src/models/Revenue.ts
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Users } from './Users';

@Entity()
export class Revenue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  description: string;

  @Column({ type: "decimal" })
  value: number;

  @Column({ type: "timestamptz" })
  date: Date | null;

  @CreateDateColumn({ type: "timestamptz", nullable: true, default: "now()" })
  created_at: Date | null;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date | null;

  @DeleteDateColumn({ type: "timestamptz" })
  deleted_at: Date | null;

  @ManyToOne(() => Users, (user) => user.revenues, { onDelete: "CASCADE" })
  @JoinColumn({ name: "created_by" })
  created_by: Users;
}