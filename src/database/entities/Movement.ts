import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import { MovementFieldTypeType } from "@database/types";

@Entity({ name: "movements" })
class Movement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column()
  type!: MovementFieldTypeType;

  @Column()
  description!: string;

  @Column("numeric")
  value!: number;

  @ManyToOne(() => User, (user) => user.movements)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @CreateDateColumn({ name: "updated_at", nullable: true })
  updatedAt!: Date | null;
}

export default Movement;
