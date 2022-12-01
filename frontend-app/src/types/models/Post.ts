import { Like } from './Like';

export interface Post {
  id: Number;
  content: String;
  userId?: Number;
  likes?: Array<Like>;
  comments?: Array<Comment>;
}
