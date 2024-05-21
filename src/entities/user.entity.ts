import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_ID: number;

  @Column()
  Username: string;

  @Column()
  password: string;

  @Column()
  Bio: string;

  @Column({ nullable: true })
  avartar?: string;
}

//UserEntity extends BaseEntity: BaseEntity là lớp cha, UserEntity là lớp con và kế thừa thuộc tính từ lớp cha.