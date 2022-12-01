import { User } from 'types/models/User';

export interface CurrentUserState {
  user: User;
  users: User[];
}
