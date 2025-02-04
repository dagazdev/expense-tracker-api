import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import AccessToken from "./AccessToken";
import Movement from "./Movement";

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

  @OneToMany(() => Movement, (movement) => movement.user)
  movements!: Movement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt!: Date | null;

  static hidden = ["password", "tokens"];
}

export default User;
