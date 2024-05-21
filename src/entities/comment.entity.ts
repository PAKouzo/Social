import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    cmt_ID: number;

    @Column()
    user_ID: number;

    @Column()
    post_ID: number;

    @Column()
    content: string;
}