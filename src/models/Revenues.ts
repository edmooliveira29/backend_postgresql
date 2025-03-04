import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Users } from './Users';

@Entity()
export class Revenues {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  description: string;

  @Column({
    type: "decimal",
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  value: number;

  @Column({ type: "timestamptz" })
  date: Date | null;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Users, (user) => user.revenues)
  @JoinColumn({ name: "created_by" })
  created_by: Users;
}