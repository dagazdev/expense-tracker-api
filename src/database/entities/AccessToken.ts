import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "access_tokens" })
class AccessToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("char", { length: 64 })
  token!: string;

  @Column("int")
  user_id!: number;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default AccessToken;
