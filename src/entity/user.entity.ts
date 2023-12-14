import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn } from 'typeorm';

@Entity({name: "user_tb"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    fullname: string;

    @Column("varchar")
    username: string;

    @Column("varchar")
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}   