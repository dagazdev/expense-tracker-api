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

  @Column("varchar")
  token!: string;

  @Column("int", { name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default AccessToken;
