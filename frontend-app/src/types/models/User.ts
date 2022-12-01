import { Friendship } from './Friendship';
import { Like } from './Like';
import { Post } from './Post';

export interface User {
  id: number;
  email: String;
  username: String;
  password?: String;
  firstName: String;
  lastName: String;
  image?: String;
  gender?: String;
  age?: Number;
  phoneNumber?: String;
  posts?: Array<Post>;
  likes?: Array<Like>;
  sender?: Array<Friendship>;
  reciver?: Array<Friendship>;
}
