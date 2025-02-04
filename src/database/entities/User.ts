import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import AccessToken from "./AccessToken";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => AccessToken, (accessToken) => accessToken.user)
  tokens!: AccessToken[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default User;
