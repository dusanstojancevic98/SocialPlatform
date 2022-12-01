import { User } from './User';

export interface Friendship {
  id: number;
  accepted: boolean;
  senderId?: Number;
  sender?: User;
  reciver?: User;
  reciverId?: Number;
}
