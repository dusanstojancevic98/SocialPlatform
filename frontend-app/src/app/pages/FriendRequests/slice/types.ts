import { Friendship } from 'types/models/Friendship';
import { UserSearchDTO } from 'types/models/UserSearchDTO';

export interface FriendRequestState {
  requests: Friendship[];
}
