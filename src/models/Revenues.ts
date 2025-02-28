// src/models/Revenue.ts
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
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

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null;

  @CreateDateColumn({ type: "timestamptz" })
  updated_at: Date | null;

  @CreateDateColumn({ type: "timestamptz" })
  deleted_at: Date | null;

  @ManyToOne(() => Users, (user) => user.revenues, { onDelete: "CASCADE" })
  @JoinColumn({ name: "created_by" })
  created_by: Users;
}