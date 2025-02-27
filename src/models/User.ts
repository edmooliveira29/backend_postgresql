
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Revenue } from './Revenue';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ length: 255, })
    password: string;   

    @CreateDateColumn({ type: "timestamptz", nullable: true })
    created_at: Date | null;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    updated_at: Date | null;

    @Column({ type: "timestamptz", nullable: true })
    deleted_at: Date | null;

    @OneToMany(() => Revenue, (revenue) => revenue.created_by)
    revenues: Revenue[];
}
