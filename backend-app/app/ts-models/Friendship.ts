import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table
export class Friendship extends Model {
  @Column
  accepted!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @ForeignKey(() => User)
  @Column
  reciverId?: number;

  @BelongsTo(() => User, 'reciverId')
  reciver?: User;

  @ForeignKey(() => User)
  @Column
  senderId?: number;

  @BelongsTo(() => User, 'senderId')
  sender?: User;
}
