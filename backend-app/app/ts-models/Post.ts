import {
  Table,
  Column,
  Model,
  HasMany,
  NotEmpty,
  CreatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Table
export class Post extends Model {
  @NotEmpty
  @Column
  content!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @HasMany(() => Like, "postId")
  likes?: Like[];

  @ForeignKey(() => User)
  @Column
  userId?: number;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Comment, "postId")
  comments?: Comment[];
}
