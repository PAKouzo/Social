import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    post_ID: number;

    @Column()
    user_ID: number;

    @Column()
    content: string;
}