import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Post } from "./Post";
import { User } from "./User";
@Table
export class Like extends Model {
  @ForeignKey(() => User)
  @Column
  userId?: number;

  @BelongsTo(() => User, "userId")
  user?: User;

  @ForeignKey(() => Post)
  @Column
  postId?: number;

  @BelongsTo(() => Post, "postId")
  post?: Post;
}
