
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn
} from "typeorm";
import { Revenues } from './Revenues';
import { CreditCards } from './CreditCards';

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ length: 255, })
    password: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date | null;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date | null;

    @DeleteDateColumn({ type: "timestamptz", nullable: true })
    deleted_at: Date | null;

    @OneToMany(() => Revenues, (revenue) => revenue.created_by)
    revenues: Revenues[];

    @OneToMany(() => CreditCards, (credit_cards) => credit_cards.created_by)
    credit_cards: CreditCards[]
}
