import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Payments } from './Payments';


@Entity()
export class PaymentMethods {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;
  

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date | null

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date | null

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date | null

  @OneToMany(() => Payments, (payment) => payment.payments_method)
  payments: Payments[]
}