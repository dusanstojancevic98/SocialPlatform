import {
  Table,
  Column,
  Model,
  NotEmpty,
  CreatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Post } from "./Post";
import { User } from "./User";

@Table
export class Comment extends Model {
  @NotEmpty
  @Column
  content!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @ForeignKey(() => Post)
  @Column
  postId?: number;

  @ForeignKey(() => User)
  @Column
  userId?: number;

  @BelongsTo(() => Post, "postId")
  post?: Post;
  //{ foreignKey: "userComment" }

  @BelongsTo(() => User, "userId")
  user?: User;
}
