import {
  Table,
  Column,
  Model,
  HasMany,
  NotEmpty,
} from "sequelize-typescript";
import { Comment } from "./Comment";
import { Friendship } from "./Friendship";
import { Like } from "./Like";
import { Post } from "./Post";

@Table
export class User extends Model {
  @NotEmpty
  @Column
  email!: string;

  @NotEmpty
  @Column
  username!: string;

  @NotEmpty
  @Column
  password!: string;

  @NotEmpty
  @Column
  firstName!: string;

  @NotEmpty
  @Column
  lastName!: string;

  @Column
  gender?: string;

  @Column
  age?: number;

  @Column
  phoneNumber?: number;

  @Column
  image?: string;

  @HasMany(() => Post)
  posts?: Post[];

  @HasMany(() => Like, "userId")
  likes?: Like[];

  @HasMany(() => Comment, "userId")
  comments?: Comment[];

  @HasMany(() => Friendship, "senderId")
  sender?: Friendship[];

  @HasMany(() => Friendship, "reciverId")
  reciver?: Friendship[];
}
